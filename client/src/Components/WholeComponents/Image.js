import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import ImageUi from '../UiComponents/ImageUi/ImageUi';

class Image extends Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.handleError = this.handleError.bind(this);
        this.checkAndLoad = this.checkAndLoad.bind(this);
        this.rerender = this.rerender.bind(this);
        this.afterRender = this.afterRender.bind(this);

        this.mounted = false;
    }

    static propTypes = {
        fileId: PropTypes.string,
        defaultImage: PropTypes.string
    };

    static requestedFileIds = [];

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
    }

    handleError() {
        console.error(new Error());
    }

    async checkAndLoad() {
        if(!(this.props.fileId)) { return; }

        var fileIdWasRequested = this.constructor.requestedFileIds.includes(this.props.fileId);
        if(fileIdWasRequested) { return; }

        this.constructor.requestedFileIds.push(this.props.fileId);

        var fileIsCompletelyLoaded = client.db.files.exists({
            _id: this.props.fileId,
            url: {
                $ne: undefined
            }
        });
        if(fileIsCompletelyLoaded) { return; }

        var success = await client.dbManager.loadFilesCompletely([this.props.fileId]);
        if(!success) { this.handleError(); }
    }

    rerender() {
        if(this.mounted) { this.forceUpdate(); }
    }

    afterRender() {
        this.checkAndLoad();
    }

    componentWillUnmount() {
        this.mounted = false;
        this.uninit();
    }

    componentDidUpdate() {
        this.afterRender();
    }

    componentDidMount() {
        this.mounted = true;

        this.init();
        this.afterRender();
    }

    render() {
        var file = (client.db.files.findById(this.props.fileId) || {});

        return (<ImageUi fileUrl={file.url} defaultImage={this.props.defaultImage} />);
    }
}

client.on('reset', () => { Image.requestedFileIds = []; });

export default Image;
