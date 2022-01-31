import { Exclude, Expose } from 'class-transformer';
import { Link } from '../link/link';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './orderItem';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  transactionID: string;

  @Column()
  userId: number;

  @Column()
  code: string;

  @Column()
  email: string;

  @Exclude()
  @Column({ default: false })
  completed: boolean;

  @Column()
  ambassadorEmail: string;

  @Exclude()
  @Column()
  ambassadorFirstName: string;

  @Exclude()
  @Column()
  ambassadorLastName: string;

  @Column({ nullable: true })
  ambassadorCountry: string;

  @Column({ nullable: true })
  ambassadorCity: string;

  @Column({ nullable: true })
  ambassadorAddress: string;

  @Column({ nullable: true })
  ambassadorZip: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => Link, (link) => link.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'code', referencedColumnName: 'code' })
  link: Link;

  @Expose()
  get name(): string {
    return `${this.ambassadorFirstName} ${this.ambassadorLastName}`;
  }

  @Expose()
  get total(): number {
    return this.orderItems.reduce(
      (total, orderItem) => total + orderItem.adminRevenue,
      0,
    );
  }
}
