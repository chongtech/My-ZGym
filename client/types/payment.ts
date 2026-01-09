// Payment and Membership Management Types

export type PaymentMethod = 'mbway' | 'bank_transfer' | 'google_pay';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
export type MembershipTier = 'z-total' | 'z-junior' | 'z-weekend' | 'z-senior';
export type TransactionType = 'membership_upgrade' | 'membership_downgrade' | 'membership_renewal' | 'product_purchase';

/**
 * Payment method details
 */
export interface PaymentMethodDetails {
  type: PaymentMethod;
  label: string;
  icon: string;
  description: string;
  processingTime: string;
  enabled: boolean;
}

/**
 * MBWay payment specific data
 */
export interface MBWayPayment {
  phoneNumber: string;
  reference?: string;
}

/**
 * Bank transfer payment specific data
 */
export interface BankTransferPayment {
  iban: string;
  accountHolder: string;
  reference: string;
  bankName?: string;
}

/**
 * Google Pay payment specific data
 */
export interface GooglePayPayment {
  token: string;
  cardType?: string;
  lastFourDigits?: string;
}

/**
 * Payment transaction
 */
export interface PaymentTransaction {
  id: string;
  userId: string;
  amount: number;
  currency: string; // e.g., 'EUR'
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionType: TransactionType;

  // Payment method specific data
  mbwayData?: MBWayPayment;
  bankTransferData?: BankTransferPayment;
  googlePayData?: GooglePayPayment;

  // Transaction details
  description: string;
  reference: string;
  invoiceUrl?: string;

  // Related entities
  membershipTier?: MembershipTier;
  productId?: string;

  // Timestamps
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  completedAt?: string; // ISO date string

  // Metadata
  notes?: string;
  failureReason?: string;
}

/**
 * Membership plan pricing
 */
export interface MembershipPlan {
  tier: MembershipTier;
  name: string;
  description: string;
  features: string[];
  monthlyPrice: number;
  annualPrice: number;
  currency: string;
  popular?: boolean;

  // Access restrictions
  maxClassesPerWeek?: number;
  weekendOnly?: boolean;
  ageRestriction?: {
    min?: number;
    max?: number;
  };
}

/**
 * Membership change request
 */
export interface MembershipChangeRequest {
  id: string;
  userId: string;
  currentTier: MembershipTier;
  requestedTier: MembershipTier;
  changeType: 'upgrade' | 'downgrade';

  // Pricing
  proRatedAmount: number;
  newMonthlyAmount: number;
  effectiveDate: string; // ISO date string

  // Payment
  paymentTransactionId?: string;
  paymentStatus: PaymentStatus;

  // Status
  status: 'pending' | 'approved' | 'rejected' | 'completed';

  // Timestamps
  requestedAt: string; // ISO date string
  processedAt?: string; // ISO date string

  // Metadata
  notes?: string;
  rejectionReason?: string;
}

/**
 * Payment summary for UI display
 */
export interface PaymentSummary {
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  currency: string;
  description: string;
}

/**
 * Invoice details
 */
export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  transactionId: string;

  // Invoice details
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;

  // Dates
  issueDate: string; // ISO date string
  dueDate: string; // ISO date string
  paidDate?: string; // ISO date string

  // Status
  status: 'draft' | 'issued' | 'paid' | 'overdue' | 'cancelled';

  // Files
  pdfUrl?: string;

  // Billing info
  billingAddress?: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    taxId?: string;
  };
}

/**
 * Invoice line item
 */
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  taxRate?: number;
}
