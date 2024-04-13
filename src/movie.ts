export class Movie {
  private title: string;
  private releaseYear: number;
  private format: string;
  private type: string;


  constructor(
    title: string,
    releaseYear: number,
    format: string,
    type: string
  ) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.format = format;
    this.type = type;

  }

  // Getter methods
  getTitle(): string {
    return this.title;
  }

  getDirector(): string {
    return this.type;
  }

  getReleaseYear(): number {
    return this.releaseYear;
  }

  getformat(): string {
    return this.format;
  }

  // Setter methods
  setTitle(title: string): void {
    this.title = title;
  }

  setDirector(director: string): void {
    this.type = director;
  }

  setReleaseYear(releaseYear: number): void {
    this.releaseYear = releaseYear;
  }

  setformat(format: string): void {
    this.format = format;
  }
}
