import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateSaleDto, GetSalesDto } from "./sales.dto";
import { GetSalesModel } from "./sales.model";
import { SalesService } from "./sales.service";

@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  async getSales(@Query() input: GetSalesDto): Promise<GetSalesModel> {
    const [property, direction] = input.sort
      ? input.sort.split(",")
      : ["saleDate", "ASC"];

    const [sales] = await this.salesService.getAllSales({
      ...input,
      sort: {
        [property]: direction,
      },
    });

    return {
      data: sales,
    };
  }

  @Post()
  createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSale(createSaleDto);
  }
}
