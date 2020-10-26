import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddOrderIdToOrdersProducts1603670126677
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.addColumn(
      'ordersProducts',
      new TableColumn({
        name: 'orderId',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'ordersProducts',
      new TableForeignKey({
        name: 'ordersProductsOrder',
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ordersProducts', 'ordersProductsOrder');

    await queryRunner.dropColumn('ordersProducts', 'orderId');
  }
}
