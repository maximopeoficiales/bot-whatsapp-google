import { ResultGoogle } from 'src/types/ResultGoogle';
export declare class GoogleService {
    filterDataNotRepeat: (data: string[]) => string[];
    filterDataDefinitions: (data: string[]) => string[];
    filterLinkImages: (definitionsData: any[]) => string[];
    searchDefinition: (definition: string, fullData?: boolean) => Promise<ResultGoogle>;
}
