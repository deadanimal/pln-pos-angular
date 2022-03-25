export class InvoiceReceipt {
  public id: string;
  public total_price_before_voucher: number;
  public total_voucher: number;
  public total_price_after_voucher: number;
  public status: string;
  public invoice_created_datetime: string;
  public invoice_running_no: string;
  public receipt_running_no: string;
  public pending_payment_datetime: string;
  public payment_successful_datetime: string;
  public payment_rejected_datetime: string;
  public receipt_created_datetime: string;
  public user: any;
  public fpx_transaction_id: string;
  public cash_transaction_id: string;
  public cart_id: [];
  public voucher_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    total_price_before_voucher: number,
    total_voucher: number,
    total_price_after_voucher: number,
    status: string,
    invoice_created_datetime: string,
    pending_payment_datetime: string,
    payment_successful_datetime: string,
    payment_rejected_datetime: string,
    receipt_created_datetime: string,
    user: any,
    fpx_transaction_id: string,
    cash_transaction_id: string,
    cart_id: [],
    voucher_id: string,
    created_date: string,
    modified_date: string,
    invoice_running_no: string,
    receipt_running_no: string,
  ) {
    this.id = id;
    this.total_price_before_voucher = total_price_before_voucher;
    this.total_voucher = total_voucher;
    this.total_price_after_voucher = total_price_after_voucher;
    this.status = status;
    this.invoice_created_datetime = invoice_created_datetime;
    this.pending_payment_datetime = pending_payment_datetime;
    this.payment_successful_datetime = payment_successful_datetime;
    this.payment_rejected_datetime = payment_rejected_datetime;
    this.receipt_created_datetime = receipt_created_datetime;
    this.user = user;
    this.fpx_transaction_id = fpx_transaction_id;
    this.cash_transaction_id = cash_transaction_id;
    this.cart_id = cart_id;
    this.voucher_id = voucher_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
    this.invoice_running_no = invoice_running_no;
    this.receipt_running_no = receipt_running_no;
  }
}
