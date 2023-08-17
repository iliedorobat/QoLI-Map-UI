export class LifeIndexFilterType {
    public category: string | null = null;
    public year: string | null = null;

    public isDisabled() {
        return this.category === null || this.year === null;
    }

    public isEmpty() {
        return this.category === null && this.year === null;
    }
}
