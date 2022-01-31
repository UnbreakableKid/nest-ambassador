import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ default: false })
  completed: boolean;

  @Column()
  ambassadorEmail: string;

  @Column()
  ambassadorFirstName: string;

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
}
