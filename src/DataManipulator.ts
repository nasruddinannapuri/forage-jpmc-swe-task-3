import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  timestamp: Date;
  upper_bound: number;
  lower_bound: number;
  trigger_alert?: number | undefined;
}

export class DataManipulator {
  static generateRow(data: ServerRespond[]): Row {
    const priceABC = (data[0].top_ask.price + data[0].top_bid.price) / 2;
    const priceDEF = (data[1].top_ask.price + data[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;

    const upper_bound = 1.05; // Example constant
    const lower_bound = 0.95; // Example constant

    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: data[0].timestamp > data[1].timestamp ? data[0].timestamp : data[1].timestamp,
      upper_bound: upper_bound,
      lower_bound: lower_bound,
      trigger_alert: (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined,
    };
  }
}
