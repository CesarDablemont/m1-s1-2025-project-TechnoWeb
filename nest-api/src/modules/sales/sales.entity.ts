import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { type ClientId } from '../clients/entities/client.entity';
import { BookEntity, type BookId } from '../books/entities/book.entity';

export type SalesId = string & { __brand: 'Sales' };

@Entity('sales')
export class SaleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: SalesId;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: ClientId;

  @Column({ name: 'book_id', type: 'uuid' })
  bookId: BookId;

  @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;

  @Column({ name: 'sale_date', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  saleDate: Date;

}
