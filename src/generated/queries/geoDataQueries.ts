export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** A city is a large human settlement. */
export type City = {
  __typename?: 'City';
  /** The continent. */
  continent: Continent;
  /** The country. */
  country: Country;
  /** The Geonames.org ID. */
  geonamesID: Scalars['Int'];
  /** The Wikidata ID. */
  id: Scalars['String'];
  /** The location. */
  location?: Maybe<Coordinates>;
  /** The name. */
  name: Scalars['String'];
  /** The population. */
  population: Scalars['Int'];
  /** The regular time zone (non-DST). */
  timeZone?: Maybe<TimeZone>;
  /** The time zone during daylight savings time. */
  timeZoneDST?: Maybe<TimeZone>;
};

export type CityWhere = {
  id?: Maybe<WhereString>;
  name?: Maybe<WhereString>;
  countryName?: Maybe<WhereString>;
  population?: Maybe<WhereFloat>;
};

/** Information about the client that sent the request. */
export type Client = {
  __typename?: 'Client';
  /** The IP address. */
  ipAddress: IpAddress;
  /** The user agent. */
  userAgent: Scalars['String'];
};

/** A continent is one of several very large landmasses. */
export type Continent = {
  __typename?: 'Continent';
  /** All countries located on the continent. */
  countries: Array<Country>;
  /** The Geonames.org ID. */
  geonamesID: Scalars['Int'];
  /** The Wikidata ID. */
  id: Scalars['String'];
  /** The name. */
  name: Scalars['String'];
  /** The population. */
  population: Scalars['Int'];
};

export type ContinentWhere = {
  id?: Maybe<WhereString>;
  name?: Maybe<WhereString>;
  geonamesId?: Maybe<WhereInt>;
};

/** Geographic coordinates. */
export type Coordinates = {
  __typename?: 'Coordinates';
  /** Latitude. */
  lat: Scalars['Float'];
  /** Longitude */
  long: Scalars['Float'];
};

/** A sovereign state. */
export type Country = {
  __typename?: 'Country';
  /** The ISO 3166-1 alpha-2 code. */
  alpha2Code: Scalars['String'];
  /** The ISO 3166-1 alpha-3 code. */
  alpha3Code: Scalars['String'];
  /** Calling codes. */
  callingCodes: Array<Scalars['String']>;
  /** The capital city. */
  capital?: Maybe<City>;
  /** All cities of the country. */
  cities: Array<City>;
  /** The continent the country is located in. */
  continent: Continent;
  /** All official currencies of the country. */
  currencies: Array<Currency>;
  /** The Geonames.org ID. */
  geonamesID: Scalars['Int'];
  /** The Wikidata ID. */
  id: Scalars['String'];
  /** All official languages of the country. */
  languages: Array<Language>;
  /** The location. */
  location?: Maybe<Coordinates>;
  /** The name. */
  name: Scalars['String'];
  /** The population. */
  population: Scalars['Int'];
  /** The general VAT rate. */
  vatRate?: Maybe<Scalars['Float']>;
};

export type CountryWhere = {
  id?: Maybe<WhereString>;
  name?: Maybe<WhereString>;
  alpha2Code?: Maybe<WhereString>;
  alpha3Code?: Maybe<WhereString>;
  population?: Maybe<WhereInt>;
};

export type Currency = {
  __typename?: 'Currency';
  /** Convert `amount` (default 1) to currency with code specified in `to` */
  convert?: Maybe<Scalars['Float']>;
  /** Countries that use the currency. */
  countries: Array<Country>;
  /** The Wikidata ID. */
  id: Scalars['String'];
  /** The ISO 4217 code. */
  isoCode: Scalars['String'];
  /** The name. */
  name: Scalars['String'];
  /** Unit symbols. */
  unitSymbols: Array<Scalars['String']>;
};


export type CurrencyConvertArgs = {
  amount?: Maybe<Scalars['Float']>;
  to: Scalars['String'];
};

export type CurrencyWhere = {
  id?: Maybe<WhereString>;
  name?: Maybe<WhereString>;
  isoCode?: Maybe<WhereString>;
};

export type DnsRecords = {
  __typename?: 'DNSRecords';
  a: Array<IpAddress>;
  aaaa: Array<IpAddress>;
  cname: Array<DomainName>;
  mx: Array<MxRecord>;
};

/** Domain Name of the Domain Name System (DNS). */
export type DomainName = {
  __typename?: 'DomainName';
  /** Look up A records. */
  a: Array<IpAddress>;
  /** Look up AAAA records. */
  aaaa: Array<IpAddress>;
  /** Look up CNAME records. */
  cname: Array<DomainName>;
  /** Look up MX records. */
  mx: Array<MxRecord>;
  /** The domain name. */
  name: Scalars['String'];
  /** @deprecated Use fields on domainName itself */
  records: DnsRecords;
};

export type EmailAddress = {
  __typename?: 'EmailAddress';
  /** The email address. */
  address: Scalars['String'];
  /** The host as a domain name. */
  domainName: DomainName;
  /** Host part of the email address (after the @) */
  host: Scalars['String'];
  /** Local part of the email address (before the @) */
  local: Scalars['String'];
  /** Whether this address is backed by a working mail server */
  ok: Scalars['Boolean'];
  serviceProvider?: Maybe<EmailServiceProvider>;
};

export type EmailServiceProvider = {
  __typename?: 'EmailServiceProvider';
  /** Whether this provider offers mailboxes without the need for signup */
  disposable: Scalars['Boolean'];
  /** The domain name. */
  domainName: DomainName;
  /** Whether this provider offers mailboxes at no cost */
  free: Scalars['Boolean'];
  /** Whether this provider's SMTP service is working */
  smtpOk: Scalars['Boolean'];
};

export type HtmlDocument = {
  __typename?: 'HTMLDocument';
  /** Get all nodes that match selector. */
  all: Array<HtmlNode>;
  /** Document body. */
  body: HtmlNode;
  /** Get first node that matches selector. */
  first?: Maybe<HtmlNode>;
  /** Raw HTML representation. */
  html: Scalars['String'];
  /** Document title. */
  title?: Maybe<Scalars['String']>;
};


export type HtmlDocumentAllArgs = {
  selector: Scalars['String'];
};


export type HtmlDocumentFirstArgs = {
  selector: Scalars['String'];
};

export type HtmlNode = {
  __typename?: 'HTMLNode';
  /** Get all nodes that match selector. */
  all: Array<HtmlNode>;
  /** Attribute value. */
  attribute?: Maybe<Scalars['String']>;
  /** Child nodes. */
  children: Array<HtmlNode>;
  /** Get first node that matches selector. */
  first?: Maybe<HtmlNode>;
  /** Raw HTML representation. */
  html: Scalars['String'];
  /** Next node. */
  next?: Maybe<HtmlNode>;
  /** Parent node. */
  parent?: Maybe<HtmlNode>;
  /** Previous node. */
  previous?: Maybe<HtmlNode>;
  /** Inner text. */
  text?: Maybe<Scalars['String']>;
};


export type HtmlNodeAllArgs = {
  selector: Scalars['String'];
};


export type HtmlNodeAttributeArgs = {
  name: Scalars['String'];
  selector?: Maybe<Scalars['String']>;
};


export type HtmlNodeFirstArgs = {
  selector: Scalars['String'];
};


export type HtmlNodeTextArgs = {
  selector?: Maybe<Scalars['String']>;
};

/**
 * Internet Protocol address. Can be either a IPv4 or a IPv6 address.
 *
 * This product includes GeoLite2 data created by MaxMind, available from www.maxmind.com.
 */
export type IpAddress = {
  __typename?: 'IPAddress';
  /** The IP address. */
  address: Scalars['String'];
  /** The city this IP address belongs to. */
  city?: Maybe<City>;
  /** The country this IP address belongs to. */
  country?: Maybe<Country>;
  /** The IP address type. */
  type: IpAddressType;
};

export enum IpAddressType {
  IPv4 = 'IPv4',
  IPv6 = 'IPv6'
}

export type Language = {
  __typename?: 'Language';
  /** The ISO 639-1 code. */
  alpha2Code: Scalars['String'];
  /** The countries that use the language. */
  countries: Array<Country>;
  /** The Wikidata ID. */
  id: Scalars['String'];
  /** The name. */
  name: Scalars['String'];
};

export type LanguageWhere = {
  id?: Maybe<WhereString>;
  name?: Maybe<WhereString>;
  alpha2Code?: Maybe<WhereString>;
};

export type MxRecord = {
  __typename?: 'MXRecord';
  /** The domain name. */
  exchange: DomainName;
  /** The preference value. */
  preference: Scalars['Int'];
};

export type Markdown = {
  __typename?: 'Markdown';
  /** Convert markdown to HTML */
  html: Scalars['String'];
};

/** Query is the root object of all queries. */
export type Query = {
  __typename?: 'Query';
  /** Get cities. */
  cities: Array<City>;
  /** Get client info. */
  client: Client;
  /** Get continents. */
  continents: Array<Continent>;
  /** Get countries. */
  countries: Array<Country>;
  /** Get currencies. */
  currencies: Array<Currency>;
  /** Create `DomainName` from string. */
  domainName: DomainName;
  /** Create `EmailAddress` from string. */
  emailAddress: EmailAddress;
  /** Create `HTMLDocument` from string. */
  htmlDocument: HtmlDocument;
  /** Create `IPAddress` from string. */
  ipAddress: IpAddress;
  /** Get languages. */
  languages: Array<Language>;
  /** Create `Markdown` from string. */
  markdown: Markdown;
  random: Random;
  /** Get time zones. */
  timeZones: Array<TimeZone>;
  /** Create `URL` from string. */
  url: Url;
};


/** Query is the root object of all queries. */
export type QueryCitiesArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CityWhere>;
};


/** Query is the root object of all queries. */
export type QueryContinentsArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ContinentWhere>;
};


/** Query is the root object of all queries. */
export type QueryCountriesArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CountryWhere>;
};


/** Query is the root object of all queries. */
export type QueryCurrenciesArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CurrencyWhere>;
};


/** Query is the root object of all queries. */
export type QueryDomainNameArgs = {
  name: Scalars['String'];
};


/** Query is the root object of all queries. */
export type QueryEmailAddressArgs = {
  address: Scalars['String'];
};


/** Query is the root object of all queries. */
export type QueryHtmlDocumentArgs = {
  html: Scalars['String'];
};


/** Query is the root object of all queries. */
export type QueryIpAddressArgs = {
  address: Scalars['String'];
};


/** Query is the root object of all queries. */
export type QueryLanguagesArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LanguageWhere>;
};


/** Query is the root object of all queries. */
export type QueryMarkdownArgs = {
  text: Scalars['String'];
};


/** Query is the root object of all queries. */
export type QueryRandomArgs = {
  cacheBuster?: Maybe<Scalars['String']>;
};


/** Query is the root object of all queries. */
export type QueryTimeZonesArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TimeZoneWhere>;
};


/** Query is the root object of all queries. */
export type QueryUrlArgs = {
  url: Scalars['String'];
};

/** Cryptographically secure random number generator. */
export type Random = {
  __typename?: 'Random';
  /** Generate a float. */
  float: Scalars['Int'];
  /** Generate a integer. */
  int: Scalars['Int'];
  /** Generate a string. */
  string: Scalars['String'];
};


/** Cryptographically secure random number generator. */
export type RandomFloatArgs = {
  high?: Maybe<Scalars['Float']>;
  low?: Maybe<Scalars['Float']>;
};


/** Cryptographically secure random number generator. */
export type RandomIntArgs = {
  high?: Maybe<Scalars['Int']>;
  low?: Maybe<Scalars['Int']>;
};


/** Cryptographically secure random number generator. */
export type RandomStringArgs = {
  length?: Maybe<Scalars['Int']>;
};

/** Time zone offset from UTC. */
export type TimeZone = {
  __typename?: 'TimeZone';
  /** Cities in this time zone. */
  cities: Array<City>;
  /** The Wikidata ID. */
  id: Scalars['String'];
  /** The name. */
  name: Scalars['String'];
  /** The UTC offset. */
  offset: Scalars['Float'];
};

export type TimeZoneWhere = {
  id?: Maybe<WhereString>;
  name?: Maybe<WhereString>;
  offset?: Maybe<WhereFloat>;
};

/** Uniform Resource Locator (URL) in the form `<scheme>://<host><:port>/<path>?<query>`. */
export type Url = {
  __typename?: 'URL';
  /** The host as a domain name. */
  domainName?: Maybe<DomainName>;
  /** The host. */
  host: Scalars['String'];
  /** Fetches the URL and returns `HTMLDocument`. Does not resolve redirects. Returns an error if the request fails or null if the response is not a HTML document. */
  htmlDocument?: Maybe<HtmlDocument>;
  /** The path. */
  path?: Maybe<Scalars['String']>;
  /** The port. */
  port?: Maybe<Scalars['Int']>;
  /** The query. */
  query?: Maybe<Scalars['String']>;
  /** The scheme. */
  scheme: Scalars['String'];
  /** The full URL. */
  url: Scalars['String'];
};

export type WhereFloat = {
  eq?: Maybe<Scalars['Float']>;
  neq?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Scalars['Float']>>;
  nin?: Maybe<Array<Scalars['Float']>>;
  lt?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
};

export type WhereInt = {
  eq?: Maybe<Scalars['Int']>;
  neq?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  nin?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
};

export type WhereString = {
  eq?: Maybe<Scalars['String']>;
  neq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  nin?: Maybe<Array<Scalars['String']>>;
};

export type QCitiesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CityWhere>;
}>;


export type QCitiesQuery = (
  { __typename?: 'Query' }
  & { cities: Array<(
    { __typename?: 'City' }
    & Pick<City, 'id' | 'name' | 'population'>
    & { location?: Maybe<(
      { __typename?: 'Coordinates' }
      & Pick<Coordinates, 'lat' | 'long'>
    )>, country: (
      { __typename?: 'Country' }
      & CountryDefFragment
    ) }
  )> }
);

export type QCountriesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CountryWhere>;
}>;


export type QCountriesQuery = (
  { __typename?: 'Query' }
  & { countries: Array<(
    { __typename?: 'Country' }
    & CountryDefFragment
  )> }
);

export type CountryDefFragment = (
  { __typename?: 'Country' }
  & Pick<Country, 'id' | 'name' | 'population'>
  & { location?: Maybe<(
    { __typename?: 'Coordinates' }
    & Pick<Coordinates, 'lat' | 'long'>
  )>, currencies: Array<(
    { __typename?: 'Currency' }
    & Pick<Currency, 'id' | 'name'>
  )>, languages: Array<(
    { __typename?: 'Language' }
    & Pick<Language, 'id' | 'name'>
  )>, capital?: Maybe<(
    { __typename?: 'City' }
    & Pick<City, 'id' | 'name' | 'population'>
    & { location?: Maybe<(
      { __typename?: 'Coordinates' }
      & Pick<Coordinates, 'lat' | 'long'>
    )> }
  )> }
);


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    