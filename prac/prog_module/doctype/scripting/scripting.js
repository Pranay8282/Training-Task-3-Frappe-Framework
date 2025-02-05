// Copyright (c) 2025, Sanskar and contributors
// For license information, please see license.txt


   
frappe.ui.form.on("scripting", {
	// refresh(frm) {
    //     frappe.msgprint("Hii Userr !!")
	// },


    ///////////////////////////////Events///////////////////////////
    
    
    refresh:function(frm){
        // frm.set_intro("Hlwww");

        if(frm.is_new()){
            frm.set_intro("Its First Hellow")
        }

        // frm.add_custom_button("Click Me Button",()=>{
        //     frappe.msgprint(__("You Clicked Mee !!!!"))
        // })


        frm.add_custom_button("Click Me1",()=>{
            frappe.msgprint("You Clicked on 1'st button");
        },'click me')
        frm.add_custom_button("Click Me2",()=>{
            frappe.msgprint("You Clicked on 2'st button");
        },'click me')
    },

    validate:function(frm){
        frm.set_value('full_name' ,frm.doc.first_name + " " + frm.doc.middle_name + " " + frm.doc.last_name)


        let row=frm.add_child('familiy_members',{
            name1:"John cena",
            age:58,
            relation:"Father",
        });
    },


    enable:function(frm){
        frm.set_df_property("first_name","reqd",1);
        // frm.set_df_property("middle_name",'read_only',1);
        frm.toggle_reqd('age',true)
    },
    // onload:function(frm){
    //     frappe.msgprint("Hellow !!")
    // }

    // validate: function(frm){
    //     frappe.throw("Errorr")
    // }

    // before_save:function(frm){
    //     frappe.throw("There is an saving error before")
    // },



    // after_save:function(frm){
    //     frappe.throw("There is an saving error after")
    // },

    // enable:function(frm){
    //   if(frm.doc.enable){
    //     frappe.msgprint("You  checked Enable Option")
    //   }else{
    //     frappe.msgprint("You unchecked Enable Option")
    //   }
    // },

    // age:function(frm){
    //     frappe.msgprint("You Changed an age")
    // }



    // familiy_members_on_form_rendered:function(frm){
    //     frappe.msgprint("You Are edited in family members group")
    // }


    // before_submit : function(frm){
    //     frappe.throw("You cannot submit it");
    // },

    // on_submit:function(frm){
    //     frappe.msgprint("Your massage is submitted");
    // },

    // before_cancel:function(frm){
    //     frappe.throw("Hieee You cannot cancel it")
    // },

    // after_cancel:function(frm){
    //     frappe.msgprint("Removed")
    // },



        after_save: function(frm) {
            let full_name = [frm.doc.first_name, frm.doc.middle_name, frm.doc.last_name]
                .filter(Boolean) 
                .join(" ");
    
            frappe.msgprint(__("The full name is '{0}'", [full_name]));

            for (let row of frm.doc.familiy_members){
                frappe.msgprint(("{0}. The Family member is {1} and Relation is {2}",[row.idx,row.name1,row.relation]));    
            }
        }

    

});


frappe.ui.form.on('Family members',{


    name1:function(frm){
        frappe.msgprint("You changed a name of family member");
    },
    age:function(frm){
        frappe.msgprint("You changed a Age of family member");
    }
});