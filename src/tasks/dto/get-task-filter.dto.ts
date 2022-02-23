import {TaskStatus} from "../tasks.model";
import {Optional} from "@nestjs/common";
import {IsEnum, IsString} from "class-validator";


export class GetTaskFilterDto {
    @Optional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @Optional()
    @IsString()
    search?: string;
}
