import ModuleGeneric from "../module";
import ModuleMailchimpProperties from "../../interfaces/modules/interface-Mailchimp";
import mailchimp from "../../config/mailchimp";

class ModuleMailchimp extends ModuleGeneric {
    listID: string;
    email: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    birthday?: string;

    constructor(module: ModuleMailchimpProperties) {
        super();
        this.listID = module.listID;
        this.email = module.email;
        this.firstName = module.firstName;
        this.lastName = module.lastName;
        this.address = module.address;
        this.phone = module.phone;
        this.birthday = module.birthday;
    }

    async execute(props: any) {     
        try {
            const response = await mailchimp.lists.addListMember(this.listID, {
                email_address: this.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: this.firstName,
                    LNAME: this.lastName,
                    ADDRESS: this.address,
                    PHONE: this.phone,
                    BIRTHDAY: this.birthday
                }
            })
            console.log(response);
        } catch (error: any) {
            console.log(error);
        }
    }
}

export default ModuleMailchimp;