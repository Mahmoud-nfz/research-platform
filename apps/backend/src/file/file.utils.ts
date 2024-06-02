import { DataCollection, File, User } from '@/database/entities';
import { JwtService } from '@nestjs/jwt';
import { FileTokenPayloadDto } from './dtos/commit-upload.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUtils {
	constructor(private readonly jwtService: JwtService) {}

	getFileToken(file: File, user: User) {
		const payload: FileTokenPayloadDto = {
			id: file.id,
			hash: file.hash,
			userId: user.id,
			size: file.size,
			path: file.path,
			name: file.name,
			dataCollectionId: file.dataCollectionId,
		};
		return this.jwtService.sign(payload);
	}

	createFileFromTokenPayload(payload: FileTokenPayloadDto) {
		return new File({
			id: payload.id,
			hash: payload.hash,
			path: payload.path,
			name: payload.name,
			size: payload.size,
			dataCollection: new DataCollection({ id: payload.dataCollectionId }),
		});
	}
}
