import { Moment } from "moment";


export class Criteria {
  UserId: any;
  UserAccountId: any;
  PageSize: any;
  Page: any;
  IsInit: boolean = false;
  SortField: string = "";
  SortAscending: boolean= false;
  ActivityCategoryId: any;
  JobId: any;
  JobPhaseId: any;
  JobSprintId: any;
  JobStageId: any;
  JobStatusId: any;
  JobCategoryId: any;
  ProjectManagerUserId: any;
  TechLeadUserId: any;
  BillingTypeId: any;
  ClientId: any;
  ActivityStatusId: any;
  ActivityStatusIdList: any[] = [];
  JobStatusIdList: any[] = [];
  BillingTypeIdList: any[] = [];
  JobCategoryIdList: any[] = [];
  JobStageIdList: any[] = [];
  Search: string ="";
  SearchSaved: string = "";
  SelectedDate: any;
  RangeOption: string = "";
  PriorityId: any;
  TicketCategoryGroupViewId: any;
  AssignedUserId: any;
  AssignedUserIdDisabled: any;
  AgentUserId: any;
  ReporterUserId: any;
  OvertimeReasonId: any;
  SprintId: any;
  RecurringActivityId: any;
  Tags: any[] = [];
  RequestTypeId: any;
  TicketState: any;
  TicketStatusIdList: any[] = [];
  TicketCategoryIdList: any[] = [];


  ActivityId: any;
  CriteriaTag: string = "";
  ShowJob: boolean = false;
  ShowClient: boolean = false;
  ShowStatus: boolean = false;
  ShowCategory: boolean = false;
  ShowStarted: boolean = false;
  ShowArriveDateTime: boolean = false;
  ShowStopDateTime: boolean = false;
  ShowShowTotalKm: boolean = false;
  ShowJobCardNumnber: boolean = false;
  ShowDue: boolean = false;
  ShowEstimatedHours: boolean = false;
  ShowUser: boolean = false;
  ShowAgent: boolean = false;
  ShowPriority: boolean = false;
  ShowActualHours: boolean = false;
  ShowBillable: boolean = false;
  ShowTags: boolean = false;
  ShowTask: boolean = false;
  ShowTitle: boolean = false;
  ShowPhase: boolean = false;
  ShowSprint: boolean = false;
  ShowTeamSprint: boolean = false;
  ShowTasks: boolean = false;
  ShowTimer: boolean = false;
  ShowDoneHistoryDays: boolean = false;
  ShowApproval: boolean = false;
  ShowProgress: boolean = false;
  ShowTechLead: boolean = false;
  ShowProjectManager: boolean = false;
  ShowStage: boolean = false;
  ShowBillingType: boolean = false;
  ShowStartDate: boolean = false;
  ShowEndDate: boolean = false;
  ShowQuotedHours: boolean = false;
  ShowQuotedValue: boolean = false;
  ShowInvoiceValue: boolean = false;
  ShowInvoiceNumber: boolean = false;
  ShowFinancialBudget: boolean = false;
  ShowNotes: boolean = false;
  ShowPercentageComplete: boolean = false;
  ShowBillAmount: boolean = false;
  ShowTotalHours: boolean = false;
  ShowEstimateHours: boolean = false;
  ShowRelativeEstimate: boolean = false;
  ShowEpic: boolean = false;
  ShowTotalActivities: boolean = false;
  ShowTotalTasks: boolean = false;
  ShowTotalTasksOutstanding: boolean = false;
  ShowTotalTasksDone: boolean = false;
  ShowResourcesUsed: boolean = false;
  ShowActivitiesComplete: boolean = false;
  ShowActivitiesNotComplete: boolean = false;
  ShowActivitiesOverdue: boolean = false;
  ShowOutstandingHours: boolean = false;
  ShowCreatedDate: boolean = false;
  ShowModifiedDate: boolean = false;
  ShowTeam: boolean = false;
  ShowFromUser: boolean = false;
  ShowReference: boolean = false;
  ShowSentFrom: boolean = false;
  ShowOpenDuration: boolean = false;
  ShowOpenDate: boolean = false;
  ShowResolutionDate: boolean = false;
  ShowResolvedBy: boolean = false;
  ShowLastEmailReceived: boolean = false;
  ShowLastEmailSent: boolean = false;
  ShowLastViewed: boolean = false;
  ShowTotalEmailCount: boolean = false;
  ShowMandatory: boolean = false;
  ShowResponsibleParty: boolean = false;
  ShowAccountManager: boolean = false;
  ShowDomainName: boolean = false;
  ShowRateCard: boolean = false;
  ShowClientStatus: boolean = false;
  ShowProduct: boolean = false;
  ShowResourceType: boolean = false;
  ShowRequestType: boolean = false;
  ShowTimeToFirstResponse: boolean = false;
  ShowFirstResponseDateTime: boolean = false;
  ShowReporter: boolean = false;
  ShowStart: boolean = false;
  ShowEnd: boolean = false;
  ShowDurationDays: boolean = false;

  TicketViewOwnOnly: boolean = false;
  ExcludeInvalid: boolean = false;

  FromDate: any;
  ToDate: any;

  FromCreatedDateTime: any;
  ToCreatedDateTime: any;

  FromDueDateTime: any;
  ToDueDateTime: any;

  Guid: any;
  KanbanViewId: any;
  ActivityGroupViewId: any;


  //leave
  TypeOfLeaveId: any;
  ApprovedById: any;
  LeaveStatusId: any;

  // User
  WorkStatusId: any;
  UserLevelId: any;
  UserGroupId: any;
  UserRoleId: any;

  ClientStatusId: any;

  RateCardId: any;

  SelectedTabIndex: any;

  DoneHistoryDays: any;

  TicketViewId: any;
  //Leads
  LeadViewId: any;
  IsDeal: any;

  //Pipelines
  PipelineId: any;
  IsActive: any;

  // Job

  //CRM
  LeadStatusIdList: any[] = [];
  PipeLineIdList: any[] = []; 
  LeadCategoryIdList: any[] = [];
  LeadSourceIdList: any[] = [];
  SolutionsIdList: any[] = [];
  IndustryIdList: any[] = [];
  CompanyIdList: any[] = [];
  CrmDocumentCategoryIdList: any[] = [];
  NotInCrmDocumentCategoryIdList: any[] = [];
  DocumentCategoryIdCommaList: any;


  LeadTypeId: any;
  LeadStatusId: any;
  PipeLineId: any;
  LeadCategoryId: any;
  LeadSourceId: any;
  SolutionsId: any;
  IndustryId: any;
  CompanyId: any;
  ContactId: any;
  CrmDocumentCategoryId: any;
  NotInCrmDocumentCategoryId: any;
  IsCreatedDate: any;
  IsAnniversaryDate: any;
   
  ShowSource: boolean = false;
  ShowPipeLine: boolean = false;
  ShowAnniversaryDate: boolean = false;
  ShowSolutions: boolean = false;
  ShowDealDate: boolean = false;
  ShowIndustry: boolean = false;
  ShowCompany: boolean = false;

  ShowClientEmail: boolean = false;
  ShowClientNumber: boolean = false;
  ShowPrimaryName: boolean = false;
  ShowPrimarySurname: boolean = false;
  ShowPrimaryEmail: boolean = false;
  ShowPrimaryMobile: boolean = false;
  ShowSLA: boolean = false;
  ShowSLAHours: boolean = false;
  ShowSLATimeLeft: boolean = false;
  ShowScheduledDate: boolean = false;
  ShowDisplayName: boolean = false;
  ShowCell: boolean = false;
  ShowTelephone: boolean = false;
  ShowDesignation: boolean = false;
  ShowEmailAddress: boolean = false;


  TeamId: any;
  TeamIdList: any[] = [];

  MessageLogStatusIds: any[] = [];

  TeamUserId: any;

  TeamRoleId: any;
  AuthorisationId: any;
  AuthorisationIdList: any[] = [];
  AuthorisationIdListString: any;

  ServiceId: any;

  //Audit
  TableName: any;
  PrimaryKey: any;

  TicketId: any;
  TicketStatusId: any;

  //JB: New Kanban hide lists
  KanbanStatusHideIdList: any[] = [];
  KanbanResourceHideIdList: any[] = [];

  //MP : Ticket Category
  TicketCategoryId: any;
  TicketCategoryGroupId: any;
  TicketCategoryTaskId: any;
  TicketCategoryUserId: any;

  
  //Lookups
  DefaultHours: any;
  MandatoryHours: any;


  OldTicketCategoryIds: any[] = [];
  NewTicketCategoryIds: any[] = [];
  OldSortOrder: any[] = [];
  NewSortOrder: any[] = [];

  TagIds: any[] = [];
  TagNames: any[] = [];
  TagId: any;

  NewInboundActionRuleIds: any[] = [];
  OldInboundActionRuleIds: any[] = [];
  Reset: boolean = false;

  WikiId: number = 0;
  WikiPageId: number = 0;

  PreventSave: any;
  
  TravelTripId: number = 0;
  IsUserProfile: boolean = false;
  Id: any;
  Name: any;
  Code: any;
  GroupBy: any;
  Colour: any;
  Description: any;
  SortOrder: any;
  ForeColour: any;
  Icon: any;
  EditMode: any;
  AltBoolValue: any;
  MentionHandle: any;

 ChangedStatusCode: string = "";
  AutoTicketAssignEnabled: any;

  ClientViewId: any;
  ClientStatusIdList: any;

  AddressId: any;
  CommentHeaderId: any;

  ContactViewId: any;

  ListToggle: any;
  View: any;

  CategoryIdList: any[] = [];
  ClientName: any;

  CustomFields: any[] = [];

  CustomFieldId: any;

  FieldTypeId: any; 

  RecordTypeId: any; 

  LookupTypeId: any; 

  // AUthor: Junior Malaza
  // Created Date: 12-07-2022
  
  // Supplier
  SupplierId: any;
  SupplierStatusId: any;

  ShowArchive: boolean = false;

  LicenseTypeId: any;

  InvoiceItemId: any;
  InvoiceId: any;
  ItemDesciption: any;
  ItemCode: any;
  Quantity: any;
  Rate: any;
  VAT_Rate: any;
  VAT_Amount: any;
  TotalInclVAT: any;
  TotalExclVAT: any;

  SlaCalendarId: any;
  
  PolicyTypeId: any;
  PolicyStatusId: any;
  InsurerId: any;

  //Reporting
  ReportGroupId: number = 0;
  ReportSectionId: number = 0;
  ReportComponentName: string = "";
  ReportMethodName: string = "";
  ReportExportTemplate: string = "";

  PolicyId: any;

  EndDate: any;
  TimeInDecimal: any;

  DatabaseName: any;

  EpicId: any;
  EpicStatusId: any;

  SubscriberId: any;

  CannedResponseId: number = 0;
  CannedResponseGroupViewId: number = 0;
  CannedResponseGroupId: number = 0;

  AlertIdList: any[] = [];

  //G: For the Visibill Approver process
  UserEmailAddress: any;


  ContactEmailAddress: any;

  ClientContactId: number = 0;

  UserIdList: any;

  PolicyRiskId: number = 0;
  PolicyRiskDriverId: number = 0;
  PolicyClaimId: number = 0;

  EffectiveFromDate: any;
  EffectiveToDate: any;

  RenewalFromDate: any;
  RenewalToDate: any;

  InceptionFromDate: any;
  InceptionToDate: any;

  ReviewFromDate: any;
  ReviewToDate: any;

  ClientUserId: any;

  Contact: any;

  SlaId:any;
  SlaEscalationId:any;

  WorkflowId:any;
  ModuleId:any;
}

export class DateRange {

  startDate?: Moment | null;
  endDate?: Moment | null;
  isOnClear: boolean = false;
  isOnChange: boolean = false;
  isRange: boolean = false;
  name?: string;
}
