export type AutoQuoteData = {
  advisor: Advisor;
  insured: Insured;
  vehicle: Vehicle;
  insurers: InsurerOption[];
  summaryText?: string;
  legalText?: string;
  generatedAt: string;
  isDraft: boolean;
  showInternalPage?: boolean;
};

export type Advisor = {
  name: string;
  email: string;
  website: string;
};

export type Insured = {
  name: string;
  identification: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
};

export type Vehicle = {
  description: string;
  plate: string;
  model: string;
  isZeroKm: boolean;
  use: string;
  fasecolda: string;
  insuredValue: number;
  accessoriesValue: number;
  circulationCity: string;
};

export type InsurerOption = {
  id: string;
  insurer: string;
  product: string;
  quoteNumber?: string;
  validUntil?: string;
  annualPremium: number;
  monthlyPayment?: number;
  insuredVehicleValue: number;
  coverages: {
    rceGlobalLimit?: string;
    rceDeductible?: string;
    thirdPartyPropertyDamage?: boolean;
    thirdPartyInjuryDeath?: boolean;

    totalDamageDeductible?: string;
    partialDamageDeductible?: string;
    totalTheftDeductible?: string;
    partialTheftDeductible?: string;
    naturalEvents?: string | boolean;
    patrimonialProtection?: boolean;

    replacementVehicleTotalLoss?: string | boolean;
    replacementVehiclePartialLoss?: string | boolean;

    travelAssistance?: string | boolean;
    workshopCar?: string | boolean;
    chosenDriver?: string | boolean;
    legalAssistance?: string | boolean;
    personalAccidents?: string;
    towTruck?: string | boolean;
    
    // Add an index signature to allow string indexing in getters
    [key: string]: any;
  };
  
  // Add an index signature for the base object too
  [key: string]: any;
};
