class Vote {
    #elRef;
    #parent;
    #getItem(selector) {
        return this.#elRef.querySelector(selector);
    }

    constructor(parent, content, amount) {
        this.content = content;
        this.amount = amount;
        this.#parent = parent;
    }

    bindCard(el) {
        if (!el) {
            return;
        }

        this.#elRef = el;
        const contentItem = this.#getItem('.vote-card-content');
        const amountItem = this.#getItem('.vote-card-amount');

        if (!contentItem || !amountItem) {
            return;
        }

        amountItem.innerText = this.amount;
        contentItem.onclick = () => {
            if (!this.#parent.isVoted()) {
                this.amount++;
                amountItem.innerText = this.amount;
                this.#parent.setVoted();
            } else {
                alert("You have already voted!");
            }
        };
    }
}

class VotesPageModel {
    constructor() {
    }

    #voted = false

    setVoted() {
        this.#voted = true;
    }

    isVoted() {
        return this.#voted;
    }

    loadData() {
        this.votesList = [
            new Vote(this, '&#128515;', 0),
            new Vote(this, '&#128516;', 5),
            new Vote(this, '&#128517;', 7),
            new Vote(this, '&#128518;', 1),
            new Vote(this, '&#128519;', 11),
        ];
    }
}

window.onload = () => {
    const model = new VotesPageModel();
    model.loadData();

    const wrapper = document.getElementsByClassName('votes-wrapper')[0];

    const votes = model.votesList;
    for (const vote of votes) {
        const voteCard = document.createElement('div');
        voteCard.classList.add('vote-card');

        const voteCardContent = document.createElement('div');
        voteCardContent.classList.add('vote-card-content');
        voteCardContent.innerHTML = vote.content;
        voteCard.appendChild(voteCardContent);

        const voteCardAmount = document.createElement('div');
        voteCardAmount.classList.add('vote-card-amount');
        voteCard.appendChild(voteCardAmount);

        vote.bindCard(voteCard);
        wrapper.appendChild(voteCard);
    }
};
