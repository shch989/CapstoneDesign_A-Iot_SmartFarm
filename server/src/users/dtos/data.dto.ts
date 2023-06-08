import { PartialType } from "@nestjs/swagger";
import { Data } from "../schemas/data.schema";

export class DataDto extends PartialType(Data) { }