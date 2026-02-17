export interface AdFinding {
  timestamp: string;
  title: string;
  confidence: number;
  contextWindow: string;
  channel: string;
  status: 'Matched reference ad' | 'Related ad in ±5 minute window';
}
