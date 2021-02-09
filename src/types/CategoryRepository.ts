import { Book } from './Book'

export type CategoryRepository = {
  getByCategoryName(categoryName: string): Promise<Book[]>
}
