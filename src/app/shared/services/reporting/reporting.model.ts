export class DailyReports {
  public id: string;
  public status: string;
  public user: string;
  public opened_timestamp: string;
  public closed_timestamp: string;
  public initial_cash: number;
  public expected_cash_at_closing: number;

  public gross: number;
  public transactions: number;
  public refund: number;
  public refund_transactions: number;

  public net: number;

  public debit: number;
  public credit: number;
  public qr: number;

  public debit_refund: number;
  public credit_refund: number;
  public qr_refund: number;

  public debit_transactions: number;
  public credit_transactions: number;
  public qr_transactions: number;

  public show_cz_adult: number;
  public show_cz_kid: number;
  public show_cz_student: number;
  public show_cz_oku: number;
  public show_cz_old_folk: number;

  public show_nz_adult: number;
  public show_nz_kid: number;
  public show_nz_student: number;
  public show_nz_oku: number;
  public show_nz_old_folk: number;

  public space_cz_adult: number;
  public space_cz_kid: number;
  public space_nz_adult: number;
  public space_nz_kid: number;
  public total_facility_paid: number;

  public created_date: string;

  constructor(
    id: string,
    status: string,
    user: string,
    opened_timestamp: string,
    closed_timestamp: string,
    initial_cash: number,
    expected_cash_at_closing: number,

    gross: number,
    transactions: number,
    refund: number,
    refund_transactions: number,

    net: number,

    debit: number,
    credit: number,
    qr: number,

    debit_refund: number,
    credit_refund: number,
    qr_refund: number,

    debit_transactions: number,
    credit_transactions: number,
    qr_transactions: number,

    show_cz_adult: number,
    show_cz_kid: number,
    show_cz_student: number,
    show_cz_oku: number,
    show_cz_old_folk: number,

    show_nz_adult: number,
    show_nz_kid: number,
    show_nz_student: number,
    show_nz_oku: number,
    show_nz_old_folk: number,

    space_cz_adult: number,
    space_cz_kid: number,
    space_nz_adult: number,
    space_nz_kid: number,
    total_facility_paid: number,

    created_date: string,

  ) {

  this.id = id;
  this.status = status;
  this.user = user;
  this.opened_timestamp = opened_timestamp;
  this.closed_timestamp = closed_timestamp;
  this.initial_cash = initial_cash;
  this.expected_cash_at_closing = expected_cash_at_closing;

  this.gross = gross;
  this.transactions = transactions;
  this.refund = refund;
  this.refund_transactions = refund_transactions;

  this.net = net;

  this.debit = debit;
  this.credit = credit;
  this.qr = qr;

  this.debit_refund = debit_refund;
  this.credit_refund = credit_refund;
  this.qr_refund = qr_refund;

  this.debit_transactions = debit_transactions;
  this.credit_transactions = credit_transactions;
  this.qr_transactions = qr_transactions;

  this.show_cz_adult = show_cz_adult;
  this.show_cz_kid = show_cz_kid;
  this.show_cz_student = show_cz_student;
  this.show_cz_oku = show_cz_oku;
  this.show_cz_old_folk = show_cz_old_folk;

  this.show_nz_adult = show_nz_adult;
  this.show_nz_kid = show_nz_kid;
  this.show_nz_student = show_nz_student;
  this.show_nz_oku = show_nz_oku;
  this.show_nz_old_folk = show_nz_old_folk;

  this.space_cz_adult = space_cz_adult;
  this.space_cz_kid = space_cz_kid;
  this.space_nz_adult = space_nz_adult;
  this.space_nz_kid = space_nz_kid;
  this.total_facility_paid = total_facility_paid;
  this.created_date = created_date;

  }
}
