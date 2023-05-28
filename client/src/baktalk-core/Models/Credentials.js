class Credentials {
    constructor() {
        this.reset = this.reset.bind(this);
        this.set = this.set.bind(this);
        this.exists = this.exists.bind(this);
        this.save = this.save.bind(this);
        this.read = this.read.bind(this);

        this.read();
    }

    reset() {
        this.set(null, null);
    }

    set(userId, passwordHash) {
        this.userId = userId;
        this.passwordHash = passwordHash;

        this.save();
    }

    exists() {
        var result = ((this.userId !== null) && (this.passwordHash !== null));
        return result;
    }

    save() {
        var exists = this.exists();

        if(exists) {
            var data = JSON.stringify({
                userId: this.userId,
                passwordHash: this.passwordHash
            });

            localStorage.setItem('credentials', data);
        }
        else {
            localStorage.removeItem('credentials');
        }
    }

    read() {
        try {
            var data = JSON.parse(localStorage.getItem('credentials'));

            this.userId = (data.userId || null);
            this.passwordHash = (data.passwordHash || null);

            this.save();
        }
        catch(error) {
            this.reset();
        }
    }
}

export default Credentials;
