export interface SollDoc {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  categories?: number[];
}
