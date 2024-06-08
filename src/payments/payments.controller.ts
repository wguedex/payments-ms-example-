import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDTO } from './dto/payment-session.dto';
import { Request, Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  
  constructor(private readonly paymentsService: PaymentsService) {}

  // @Post('create-payment-session')
  // @MessagePattern('create.payment.session')
  // // createPaymentSession(@Body() paymentSessionDTO: PaymentSessionDTO){ 
  //   createPaymentSession(@Payload() paymentSessionDTO: PaymentSessionDTO ) {
  //   return this.paymentsService.createPaymentSession(paymentSessionDTO);
  // }

  @MessagePattern('create.payment.session')
  createPaymentSession(@Payload() paymentSessionDto: PaymentSessionDTO ) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  success(){
    return {
      ok:true, 
      message: 'Payment successful'
    }
  }

  @Get('cancel')
  cancel(){
    return {
      ok:false, 
      message: 'Payment cancelled'
    }
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentsService.stripeWebhook(req, res);
  }
 
}
