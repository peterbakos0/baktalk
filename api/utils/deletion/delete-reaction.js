var Reaction = require('../../DataModels/Reaction');

var deleteReaction = async (reactionId) => {
    var reaction = await Reaction.findByIdAndDelete(reactionId);
    return reaction;
};

module.exports = deleteReaction;
