export type OrderItem = [string, 'ASC' | 'DESC'];
export interface optionsPagination {
    page: number;
    limit: number;
    order: OrderItem;
}

type tokenData = {
    user: {
        id: number
    }
}

export type JwtPayloadWithTokenData = Omit<tokenData, 'id'> & JwtPayload;
