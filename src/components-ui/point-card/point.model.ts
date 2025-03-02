export interface Columns {
    points: Point[],
}

export interface Point {
    title: string;
    text: string;
    marker?: string;
    initialOpen?: boolean;
}