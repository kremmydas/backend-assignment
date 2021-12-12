create table IXP_SERVER_DATA(
    IXP VARCHAR(255),
    COUNTRY VARCHAR(64),
    CITY VARCHAR(64),
    PROTOCOL VARCHAR(4),
    RS_LOCAL_ASN INTEGER,
    NUMBER_OF_RIB_ENTRIES INTEGER,
    NUMBER_OF_PEERS INTEGER,
    TOTAL_NUMBER_OF_NEIGHBORS INTEGER,
    UPDATED_AT TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (IXP, COUNTRY, CITY, PROTOCOL)
);