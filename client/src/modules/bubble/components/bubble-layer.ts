import { BubbleBall } from "./bubble-ball";

export class BubbleLayer extends ecs.Component {

    width: number;

    height: number;

    balls: BubbleBall[];

    init(width: number, height: number) {

    }

}