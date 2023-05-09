import ModuleGenericProperties from "../module";

interface ModuleMailchimpProperties extends ModuleGenericProperties {
    listID: string;
    email: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    birthday?: string;
}

export default ModuleMailchimpProperties;