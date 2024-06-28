import Component, { ComponentProps } from '@/base/component';
import Card from "@/components/blocks/card/card";
import {getComponents, wait} from "@/helpers/helpers";

type TableOptions = {

}

interface IDeck {
    deck_id: string;
    remaining: number;
    shuffled: boolean;
}

export interface ICard {
    code: string;
    image: string;
    images: Record<'svg' | 'png', string>;
    value: string;
    suit: string;
}

export interface IDrawCard extends IDeck {
    cards: ICard[]
}

export default class Table extends Component<HTMLElement, TableOptions> {
    deckId: string | null;
    deck: IDeck | null;
    cards: Card[];
    shuffleBtn: HTMLButtonElement;

    constructor(element: ComponentProps<HTMLElement>) {
        super(element);

        this.deckId = null;
        this.deck = null;
        this.cards = [];
        this.shuffleBtn = this.getElement('shuffle')!;

        this.createDeck().then(() => {
            this.cards = getComponents('card', this.nRoot).map((card) => {
                return new Card(card, this);
            })
        })

        this.shuffleBtn.addEventListener('click', this.onClick);
    }

    checkRemainingCards = () => {
        if (this.deck && this.deck.remaining <= 0) {
            this.showBtn();
        }
    }

    onClick = () => {
        this.hideBtn();
        this.createDeck();
        this.cards.forEach((card, index) => {
            wait(150 * index).then(() => card.animation(true).then(() => card.destroy()));
        })
    }

    showBtn = () => {
        this.shuffleBtn.classList.add('show');
    }

    hideBtn = () => {
        this.shuffleBtn.classList.remove('show');
    }

    createDeck = async () => {
        const data: IDeck = await (await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,AD,AC,AH')).json();
        this.deckId = data.deck_id;
    }
}
