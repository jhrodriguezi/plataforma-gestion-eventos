export abstract class SharedDTO<T> {
    abstract validate(dto: T): void;
}