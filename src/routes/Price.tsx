import React from "react";
import styled from "styled-components";

interface ITickers {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  tickersData?: ITickers;
}

const Overview = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  align-items: center;
  span:first-child {
    font-size: 15px;
    font-weight: 400;
    /* text-transform: uppercase; */
    margin-right: 10px;
  }
`;
function Price({ tickersData }: PriceProps) {
  return (
    <div>
      <Overview>
        <OverviewItem>
          <span>1Hours</span>
        </OverviewItem>
        <OverviewItem>{`${tickersData?.quotes?.USD.percent_change_1h} %`}</OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>24Hours</span>
        </OverviewItem>
        <OverviewItem>{`${tickersData?.quotes?.USD.percent_change_24h} %`}</OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>7Days</span>
        </OverviewItem>
        <OverviewItem>{`${tickersData?.quotes?.USD.percent_change_7d} %`}</OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>30Days</span>
        </OverviewItem>
        <OverviewItem>{`${tickersData?.quotes?.USD.percent_change_30d} %`}</OverviewItem>
      </Overview>
    </div>
  );
}

export default Price;
