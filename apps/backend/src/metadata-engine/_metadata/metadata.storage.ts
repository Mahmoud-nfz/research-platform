import { Type } from '@nestjs/common';
import { PropertyMetadata } from './property-metadata.interface';
import { IndexMetadata } from './index-metadata.interface';

export class MetadataStorageHost {
	private properties = new Array<PropertyMetadata>();
	private indicies = new Array<IndexMetadata>();

	addPropertyMetadata(metadata: PropertyMetadata): void {
		this.properties.push(metadata);
	}

	getPropertyMetadatasByTarget(target: Type<unknown>): PropertyMetadata[] {
		return this.properties.filter((property) => property.target === target);
	}

	addIndexMetadata(metadata: IndexMetadata): void {
		this.indicies.push(metadata);
	}

	getIndexMetadataByTarget(target: Type<unknown>): IndexMetadata {
		return this.indicies.find((property) => property.target === target);
	}
}

const globalRef = global as any;
export const MetadataStorage: MetadataStorageHost =
	globalRef.MetadataStorage ||
	(globalRef.MetadataStorage = new MetadataStorageHost());
