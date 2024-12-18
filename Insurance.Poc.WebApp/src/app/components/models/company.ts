export class Company {
  companyId?: string;
  companyName?: string;
  databaseName?: string;
  companyPath?: string;
  isActive?: boolean;
  outboundEmailActive?: boolean;
  inboundEmailActive?: boolean;
  incidentManagementEnabled?: boolean;
  crmEnabled?: boolean;
  documentLibraryEnabled?: boolean;
  brokerModuleEnabled?: boolean;
  teamsEnabled?: boolean;
  agileEnabled?: boolean;
  autoDeploy?: boolean;
  productName?: string;
  companyEmailDomain?: string;
  appLogo?: string;
  appPrefix?: string;
  loginLogo?: string;
  appLogoSmall?: string;
  azureClientId?: string;
  azureAuthority?: string;
  visibillDatabase?: string;
  azureRedirectUri?: string;

  constructor(init?: Partial<Company>) {
    Object.assign(this, init);
  }
}
