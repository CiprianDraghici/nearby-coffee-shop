import {SecurityService} from "./security.service";

export interface IHttpResponse<T> extends Response {
    parsedBody?: T;
}

export class HttpService {
    private static instance: HttpService;
    public static baseUrl: string = "https://blue-bottle-api-test.herokuapp.com";
    public static getInstance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService();
        }

        return HttpService.instance;
    }

    public securityService: SecurityService = new SecurityService();

    public get = async <T>(url: string, args: RequestInit = { method: "get" }): Promise<IHttpResponse<T>> => {
        args.headers = this.resolveHeaders(args.headers);
        args = {...args, ...{ method: "get" }};

        return await this.http<T>(new Request(this.resolveUrl(url), args)) as IHttpResponse<T>;
    };

    public post = async <T>(url: string, body?: any, args: RequestInit = { method: "post", body: JSON.stringify(body)}): Promise<IHttpResponse<T>> => {
        args.headers = this.resolveHeaders(args.headers);
        args = {...args, ...{ method: "post", body: JSON.stringify(body)}};

        return await this.http<T>(new Request(this.resolveUrl(url), args)) as IHttpResponse<T>;
    };

    public resolveUrl(url: string) {
        return encodeURI(url);
    }

    private http = <T>(request: RequestInfo): Promise<IHttpResponse<T> | void> => {
        return new Promise((resolve, reject) => {
            let response: IHttpResponse<T>;
            fetch(request)
                .then(res => {
                    response = res;
                    return this.parseJSON(response);
                })
                .then(body => {
                    if (response.ok) {
                        response.parsedBody = body;
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    private parseJSON(response: any) {
        return response.text().then((text: string) => text ? JSON.parse(text) : {});
    }

    private resolveHeaders(headers: any) {
        headers = {...headers, ...{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }};

        return headers;
    }
}