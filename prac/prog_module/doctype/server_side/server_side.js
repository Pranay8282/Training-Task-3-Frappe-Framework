// Copyright (c) 2025, Sanskar and contributors
// For license information, please see license.txt

frappe.ui.form.on("server side", {
	refresh(frm) {
        frm.add_custom_button('Click Here',()=>{
            frm.call({
                method:"new_doc_method",
                args:{
                    docname: frm.doc.name,
                },
                freeze:true,
                freeze_message:__("Creating data"),
                callback:function(r){
                    if(r.message){
                        frappe.msgprint(__("record is created successfully") + r.message)
                    }
                }
            })
        },'calling')

        frm.add_custom_button('Click Me for freeze',()=>{
            frm.call({
                method:'new_method_freeze',
                args:{
                    msg:"Ohh No system was freezed for 10sec"
                },
                freeze:true,
                freeze_message:__('System was freeze'),
                callback:function(r){
                    frappe.msgprint(r.message)
                }
            })
        },'calling')
	},

    




    enable:function(frm){
        frappe.call({
            method:"prac.prog_module.doctype.scripting.scripting.fappe_call",
            args:{
                msg:"hello"
            },
            freeze:true,
            freeze_message:__("calling Frappe call message"),
            callback:function(r){
                frappe.msgprint(r.message)
            }

        })
    },
});

