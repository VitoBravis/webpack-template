import Component, { ComponentProps } from '@/base/component';
import Table, {IDrawCard} from "@/components/sections/table/table";

type CardOptions = {

}

const CARD_DURATION = 700;
const FLIP_DURATION = 1000;

export default class Card extends Component<HTMLElement, CardOptions> {
    cardFront: HTMLElement;
    cardBack: HTMLElement;
    cardFrontImg: HTMLImageElement;
    table: Table;

    constructor(element: ComponentProps<HTMLElement>, table: Table) {
        super(element);

        this.table = table;
        this.cardFront = this.getElement('front')!;
        this.cardBack = this.getElement('back')!;
        this.cardFrontImg = this.getElement<HTMLImageElement>('front img')!;
        this.nRoot.addEventListener('click', this.onClick)
    }

    onClick = () => {
        this.nRoot.style.zIndex = '5';
        this.draw()
            .then(() => this.animation()
                .then(() => {
                    this.nRoot.style.removeProperty('z-index')
                    this.table.checkRemainingCards();
                })
            );
    }

    draw = async () => {
        const data: IDrawCard = await (await fetch(`https://deckofcardsapi.com/api/deck/${this.table.deckId!}/draw/?count=1`)).json();
        this.table.deck = data;
        this.cardFrontImg.src = data.cards[0].image;
    }

    animation = (reverse?: boolean): Promise<void> => {
        return new Promise((resolve) => {
            this.nRoot.animate([
                {
                    transform: 'translateY(0) rotateX(30deg)',
                },
                {
                    transform: 'translate3d(0, -100%, 75px) rotateX(0deg)',
                }
            ], {
                duration: CARD_DURATION,
                delay: reverse ? FLIP_DURATION : 0,
                easing: 'ease-out',
                fill: 'forwards',
                direction: reverse ? 'reverse' : 'normal'
            })

            this.cardFront.animate([
                {
                    transform: 'rotateY(180deg)'
                },
                {
                    transform: 'rotateY(0)'
                }
            ], {
                duration: FLIP_DURATION,
                delay: reverse ? 0 : CARD_DURATION,
                easing: 'ease',
                fill: 'forwards',
                direction: reverse ? 'reverse' : 'normal'
            })

            this.cardBack.animate([
                {
                    transform: 'rotateY(0)'
                },
                {
                    transform: 'rotateY(180deg)'
                }
            ], {
                duration: FLIP_DURATION,
                delay: reverse ? 0 : CARD_DURATION,
                easing: 'ease',
                fill: 'forwards',
                direction: reverse ? 'reverse' : 'normal'
            }).addEventListener('finish', () => resolve(), { once: true });
        })
    }

    destroy() {
        this.cardFrontImg.src = '';
    }
}
