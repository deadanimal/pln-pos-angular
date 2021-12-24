export class FpxTransaction {
  public id: string;
  public fpx_msgType: string;
  public fpx_msgToken: string;
  public fpx_fpxTxnId: string;
  public fpx_sellerExId: string;
  public fpx_sellerExOrderNo: string;
  public fpx_fpxTxnTime: string;
  public fpx_sellerTxnTime: string;
  public fpx_sellerOrderNo: string;
  public fpx_sellerId: string;
  public fpx_sellerBankCode: string;
  public fpx_txnCurrency: string;
  public fpx_txnAmount: number;
  public fpx_buyerEmail: string;
  public fpx_checkSum: string;
  public fpx_buyerName: string;
  public fpx_buyerBankId: string;
  public fpx_buyerBankBranch: string;
  public fpx_buyerAccNo: string;
  public fpx_buyerId: string;
  public fpx_makerName: string;
  public fpx_buyerIban: string;
  public fpx_debitAuthCode: string;
  public fpx_debitAuthNo: string;
  public fpx_creditAuthCode: string;
  public fpx_creditAuthNo: string;
  public fpx_xtrainfo: string;
  public fpx_productDesc: string;
  public fpx_version: string;
  public fpx_eaccountNum: string;
  public fpx_ebuyerId: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    fpx_msgType: string,
    fpx_msgToken: string,
    fpx_fpxTxnId: string,
    fpx_sellerExId: string,
    fpx_sellerExOrderNo: string,
    fpx_fpxTxnTime: string,
    fpx_sellerTxnTime: string,
    fpx_sellerOrderNo: string,
    fpx_sellerId: string,
    fpx_sellerBankCode: string,
    fpx_txnCurrency: string,
    fpx_txnAmount: number,
    fpx_buyerEmail: string,
    fpx_checkSum: string,
    fpx_buyerName: string,
    fpx_buyerBankId: string,
    fpx_buyerBankBranch: string,
    fpx_buyerAccNo: string,
    fpx_buyerId: string,
    fpx_makerName: string,
    fpx_buyerIban: string,
    fpx_debitAuthCode: string,
    fpx_debitAuthNo: string,
    fpx_creditAuthCode: string,
    fpx_creditAuthNo: string,
    fpx_xtrainfo: string,
    fpx_productDesc: string,
    fpx_version: string,
    fpx_eaccountNum: string,
    fpx_ebuyerId: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.fpx_msgType = fpx_msgType;
    this.fpx_msgToken = fpx_msgToken;
    this.fpx_fpxTxnId = fpx_fpxTxnId;
    this.fpx_sellerExId = fpx_sellerExId;
    this.fpx_sellerExOrderNo = fpx_sellerExOrderNo;
    this.fpx_fpxTxnTime = fpx_fpxTxnTime;
    this.fpx_sellerTxnTime = fpx_sellerTxnTime;
    this.fpx_sellerOrderNo = fpx_sellerOrderNo;
    this.fpx_sellerId = fpx_sellerId;
    this.fpx_sellerBankCode = fpx_sellerBankCode;
    this.fpx_txnCurrency = fpx_txnCurrency;
    this.fpx_txnAmount = fpx_txnAmount;
    this.fpx_buyerEmail = fpx_buyerEmail;
    this.fpx_checkSum = fpx_checkSum;
    this.fpx_buyerName = fpx_buyerName;
    this.fpx_buyerBankId = fpx_buyerBankId;
    this.fpx_buyerBankBranch = fpx_buyerBankBranch;
    this.fpx_buyerAccNo = fpx_buyerAccNo;
    this.fpx_buyerId = fpx_buyerId;
    this.fpx_makerName = fpx_makerName;
    this.fpx_buyerIban = fpx_buyerIban;
    this.fpx_debitAuthCode = fpx_debitAuthCode;
    this.fpx_debitAuthNo = fpx_debitAuthNo;
    this.fpx_creditAuthCode = fpx_creditAuthCode;
    this.fpx_creditAuthNo = fpx_creditAuthNo;
    this.fpx_xtrainfo = fpx_xtrainfo;
    this.fpx_productDesc = fpx_productDesc;
    this.fpx_version = fpx_version;
    this.fpx_eaccountNum = fpx_eaccountNum;
    this.fpx_ebuyerId = fpx_ebuyerId;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
