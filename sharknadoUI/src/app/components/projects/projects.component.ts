import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../service/projectservice.service';
import { Employee } from '../../model/employee';
import { Project } from '../../model/project';
import {EventEmitter, Input, Output} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DndModule} from 'ng2-dnd';


@Component({
  selector: 'app-projects, demo-modal-static',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    projectDetailsForm = "projectDetailsForm";

    unassignedEmployeeList: Array<Employee> = [];
    projectList: Array<Project> = [];


    transferData: Employee;
    receivedData: Array<Employee> = [];
    

    
addEmployeeToProject($event: any, projectId: number) {
    let newEmployee: Employee = $event.dragData;
    let project: Project = this.projectList[projectId];
    //project.EmployeeList = new Array<Employee>();
    //project.EmployeeList.push(new Employee(1,"BOB","Planet"));
    //project.employeeList.push(employee);
    alert(`move employee `+ newEmployee.First_Name + ` into project ` + projectId);
    project.addEmployee(newEmployee);
   // this.receivedData.push($event.dragData);
    
}       

public getAllEmployees() {
    console.log("getting all employees.")
    return this.projectService.getAllUnassignedEmployee().subscribe(ress => {
        this.unassignedEmployeeList = ress;
        console.log("employees ",this.unassignedEmployeeList);
        
        /*this.unassignedEmployeeList.forEach(employee => {
            this.employeeList.push(employee.First_Name);
        });
        console.log("employee string list " + this.employeeList);*/
        });
    
    
    /*return this.projectService.getAllUnassignedEmployee().subscribe(ress => {
        this.unassignedEmployeeList = ress;
        console.log("employees ",this.unassignedEmployeeList);
        });*/
}

public getListOfProject() {
    console.log("getting list of projects")

    return this.projectService.getAllProjects().subscribe(ress => {
        this.projectList = ress;
        console.log("projects ", this.projectList);
    });
}

constructor(
        private projectService: ProjectService,
        private router : Router,
        private route:ActivatedRoute) {
    this.projectService = projectService;
}
    
    ngOnInit() {
       this.getAllEmployees();
       this.getListOfProject();
  }
    public enableForm(){
        //Enables fields in project details form.
        
        //if statement required to determine which form id is active
        
        
        
        //if(document.getElementById("projectDetailsForm").style.display == "block"){
          if(this.projectDetailsForm == "projectDetailsForm"){
            var name2=<HTMLInputElement> document.getElementById("name2");
            var chargecode=<HTMLInputElement> document.getElementById("chargecode2");
            var manager=<HTMLInputElement> document.getElementById("manager2");
            var email=<HTMLInputElement> document.getElementById("email2");
            
            if(name2.readOnly == true){
                name2.readOnly=false;
                chargecode.readOnly=false;
                manager.readOnly=false;
                email.readOnly=false;
            }else{
                name2.readOnly=true;
                chargecode.readOnly=true;
                manager.readOnly=true;
                email.readOnly=true; 
            }
        }
        else if(this.projectDetailsForm == "projectContactForm"){
            var contactName = <HTMLInputElement> document.getElementById("contactName");
            var contactPosition = <HTMLInputElement> document.getElementById("contactPosition");
            var preferredContact = <HTMLInputElement> document.getElementById("preferredContact");
            var altContact = <HTMLInputElement> document.getElementById("altContact");
            
            if(contactName.readOnly == true){
                contactName.readOnly = false;
                contactPosition.readOnly = false;
                preferredContact.readOnly = false;
                altContact.readOnly = false;
            }else{
                contactName.readOnly = true;
                contactPosition.readOnly = true;
                preferredContact.readOnly = true;
                altContact.readOnly = true;
            }
        }
        else if(this.projectDetailsForm == "projectChargeCodeForm"){
            
        }
        else{
              console.log("Error @ projects.component.ts on line 112.  Broken pencil icon");
        }
        
       
    }
    public setFieldReadOnly(){
        //projectDetailsForm
        var name2=<HTMLInputElement> document.getElementById("name2");
        var chargecode=<HTMLInputElement> document.getElementById("chargecode2");
        var manager=<HTMLInputElement> document.getElementById("manager2");
        var email=<HTMLInputElement> document.getElementById("email2");
        
        //projectContactForm
        
        
        //projectChargeCodeForm
        
        
        
        
        if(name2.readOnly == false){
            name2.readOnly = true;
            chargecode.readOnly = true;
            manager.readOnly = true;
            email.readOnly = true;
        }
        
    }
    public removeElements(){
        //Remove "Project Details" Tab
        document.getElementById("projectDetailsForm").style.display = "none";
        
        //Remove "Charge Codes" Tab
        document.getElementById("projectChargeCodeForm").style.display = "none";

        //Remove "Contacts" Tab
        document.getElementById("projectContactForm").style.display = "none";
        }
    
    public showEmployee(){
        this.removeElements();
        
        document.getElementById("menuEmployee").style.border = "2px solid white";
        document.getElementById("menuEmployee").style.backgroundColor = "#b6e3fd";
        
        document.getElementById("menuProjectDetails").style.border = "none";
        document.getElementById("menuProjectDetails").style.backgroundColor = "lightskyblue";
        
        document.getElementById("menuContacts").style.border = "none";
        document.getElementById("menuContacts").style.backgroundColor = "lightskyblue";
        
        document.getElementById("menuChargeCodes").style.border = "none";
        document.getElementById("menuChargeCodes").style.backgroundColor = "lightskyblue";
    }
   
    public showContacts(){
        document.getElementById("menuContacts").style.border = "2px solid white";
        document.getElementById("menuContacts").style.backgroundColor = "#b6e3fd";
        
        document.getElementById("menuChargeCodes").style.border = "none";
        document.getElementById("menuChargeCodes").style.backgroundColor = "lightskyblue";
        
        document.getElementById("menuProjectDetails").style.border = "none";
        document.getElementById("menuProjectDetails").style.backgroundColor = "lightskyblue";
        
        document.getElementById("menuEmployee").style.border = "none";
        document.getElementById("menuEmployee").style.backgroundColor = "lightskyblue";
        this.removeElements();
        this.projectDetailsForm = "projectContactForm";
        document.getElementById("projectContactForm").style.display = "block";
        
        
        //also need to get the values for charge codes and make sure they are set to a variable
        
        
        //set unneeded items to not visible
        
        }
    public showChargeCodes(){
        document.getElementById("menuChargeCodes").style.border = "2px solid white";
        document.getElementById("menuChargeCodes").style.backgroundColor = "#b6e3fd";
        
        document.getElementById("menuProjectDetails").style.border = "none";
        document.getElementById("menuProjectDetails").style.backgroundColor = "lightskyblue";
        
        document.getElementById("menuContacts").style.border = "none";
        document.getElementById("menuContacts").style.backgroundColor = "lightskyblue";
        
        document.getElementById("menuEmployee").style.border = "none";
        document.getElementById("menuEmployee").style.backgroundColor = "lightskyblue";
        
        this.removeElements();
        this.projectDetailsForm = "projectChargeCodeForm";
        
        document.getElementById("projectChargeCodeForm").style.display = "block";
        }
    public submitChanges(){
        this.normalizeProjectForm();
        
        //save changes to db
    }
    public normalizeProjectForm(){
        this.projectDetailsForm = "projectDetailsForm";
        
        this.removeElements();
        
        document.getElementById("menuProjectDetails").style.border = "2px solid white";
        document.getElementById("menuProjectDetails").style.backgroundColor = "#b6e3fd";
        
        document.getElementById("menuChargeCodes").style.border = "none";
        document.getElementById("menuChargeCodes").style.backgroundColor = "lightskyblue";
        
        document.getElementById("menuContacts").style.border = "none";
        document.getElementById("menuContacts").style.backgroundColor = "lightskyblue";
        
        document.getElementById("menuEmployee").style.border = "none";
        document.getElementById("menuEmployee").style.backgroundColor = "lightskyblue";
        
        document.getElementById("projectDetailsForm").style.display = "block";
        
        var name2=<HTMLInputElement> document.getElementById("name2");
        var chargecode=<HTMLInputElement> document.getElementById("chargecode2");
        var manager=<HTMLInputElement> document.getElementById("manager2");
        var email=<HTMLInputElement> document.getElementById("email2");
        
        if(name2.readOnly == false){
            name2.readOnly = true;
            chargecode.readOnly = true;
            manager.readOnly = true;
            email.readOnly = true;
        }
        
    }

}








