export class GameTag {

    name: string;

    gameIds: number[] = [];

    static tags: { [index: string]: GameTag } = {
        hot: {
            name: "hot",
            gameIds: [1, 4]
        },
        push: {
            name: "push",
            gameIds: [2]
        }
    } as any;
}