import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class DatabaseSnakeNamingStrategy
	extends DefaultNamingStrategy
	implements NamingStrategyInterface
{
	tableName(className: string, customName: string): string {
		return customName ? customName : snakeCase(className.concat('s'));
	}

	closureJunctionTableName(originalClosureTableName: string): string {
		return snakeCase(originalClosureTableName).concat('_closure');
	}

	columnName(
		propertyName: string,
		customName: string,
		embeddedPrefixes: string[]
	): string {
		return snakeCase(embeddedPrefixes.concat('').join('_')).concat(
			customName ? customName : snakeCase(propertyName)
		);
	}

	relationName(propertyName: string): string {
		return snakeCase(propertyName);
	}

	joinColumnName(relationName: string, referencedColumnName: string): string {
		return snakeCase(relationName + '_' + referencedColumnName);
	}

	joinTableColumnName(
		tableName: string,
		propertyName: string,
		columnName?: string
	): string {
		return snakeCase(
			tableName + '_' + (columnName ? columnName : propertyName)
		);
	}

	classTableInheritanceParentColumnName(
		parentTableName: any,
		parentTableIdPropertyName: any
	): string {
		return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
	}

	eagerJoinRelationAlias(alias: string, propertyPath: string): string {
		return alias + '__' + propertyPath.replace('.', '_');
	}
}
