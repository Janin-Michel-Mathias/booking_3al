import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { OwnerGuard } from './guards/owner.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post() // <-- POST /bookings
  create(
    @Body()
    createBookingDto: CreateBookingDto,
    @Req() req: any,
  ) {
    return this.bookingsService.create(createBookingDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get() // <-- GET /bookings
  findAll() {
    return this.bookingsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id') // <-- GET /bookings/1
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @Delete('/:id/')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
