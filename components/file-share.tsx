"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { FileText, Download, Upload, Check, X, Eye, Trash2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ClientWrapper from "./client-wrapper"

// Sample file type
interface FileItem {
  id: string
  name: string
  description: string
  size: string
  date: string
  content: string
}

export default function FileShare() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [uploadStatus, setUploadStatus] = useState<null | "success" | "error">(null)
  const [isAdmin, setIsAdmin] = useState(true) // For demo purposes, set to true
  const [showAllFiles, setShowAllFiles] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  // Sample code files for demonstration
  const [codeFiles, setCodeFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "SAP_ABAP_Report_Example.txt",
      description: "Example ABAP report with documentation",
      size: "24 KB",
      date: "2023-10-15",
      content: `REPORT ZABAP_EXAMPLE.

* Example ABAP Report
* Author: Shreyas Lakade
* Date: 2023-10-15

DATA: lv_text TYPE string VALUE 'Hello World'.

START-OF-SELECTION.
  WRITE: / lv_text.
  
  PERFORM display_info.
  
FORM display_info.
  WRITE: / 'This is an example ABAP report'.
  WRITE: / 'Created for demonstration purposes'.
ENDFORM.`,
    },
    {
      id: "2",
      name: "Custom_BAPI_Implementation.txt",
      description: "Implementation of custom BAPI for data processing",
      size: "36 KB",
      date: "2023-09-22",
      content: `FUNCTION Z_CUSTOM_BAPI.
*"----------------------------------------------------------------------
*"*"Local Interface:
*"  IMPORTING
*"     VALUE(IV_CUSTOMER_ID) TYPE  KUNNR
*"  EXPORTING
*"     VALUE(ET_CUSTOMER_DATA) TYPE  ZTT_CUSTOMER_DATA
*"     VALUE(EV_RETURN_CODE) TYPE  CHAR1
*"     VALUE(EV_MESSAGE) TYPE  STRING
*"----------------------------------------------------------------------

DATA: ls_customer TYPE zst_customer_data,
      lt_orders   TYPE ztt_orders.

* Check if customer exists
SELECT SINGLE * FROM kna1 INTO @DATA(ls_kna1)
  WHERE kunnr = @iv_customer_id.

IF sy-subrc <> 0.
  ev_return_code = 'E'.
  ev_message = 'Customer not found'.
  RETURN.
ENDIF.

* Get customer data
ls_customer-kunnr = ls_kna1-kunnr.
ls_customer-name1 = ls_kna1-name1.
ls_customer-land1 = ls_kna1-land1.

* Get customer orders
SELECT * FROM vbak INTO TABLE @DATA(lt_vbak)
  WHERE kunnr = @iv_customer_id.

LOOP AT lt_vbak INTO DATA(ls_vbak).
  APPEND INITIAL LINE TO lt_orders ASSIGNING FIELD-SYMBOL(<fs_order>).
  <fs_order>-vbeln = ls_vbak-vbeln.
  <fs_order>-erdat = ls_vbak-erdat.
  <fs_order>-netwr = ls_vbak-netwr.
ENDLOOP.

ls_customer-orders = lt_orders.
APPEND ls_customer TO et_customer_data.

ev_return_code = 'S'.
ev_message = 'Data retrieved successfully'.

ENDFUNCTION.`,
    },
    {
      id: "3",
      name: "SAP_Integration_Framework.txt",
      description: "Code for SAP integration with external systems",
      size: "48 KB",
      date: "2023-08-10",
      content: `CLASS zcl_integration_framework DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
    METHODS:
      constructor,
      send_data_to_external_system
        IMPORTING
          iv_data          TYPE string
        RETURNING
          VALUE(rv_result) TYPE string
        RAISING
          zcx_integration_error,
      receive_data_from_external_system
        IMPORTING
          iv_source_id     TYPE string
        RETURNING
          VALUE(rv_data)   TYPE string
        RAISING
          zcx_integration_error.
  PROTECTED SECTION.
  PRIVATE SECTION.
    DATA:
      mo_http_client TYPE REF TO if_http_client.
ENDCLASS.

CLASS zcl_integration_framework IMPLEMENTATION.
  METHOD constructor.
    " Initialize HTTP client
    TRY.
        cl_http_client=>create_by_url(
          EXPORTING
            url                = 'https://api.example.com'
          IMPORTING
            client             = mo_http_client
          EXCEPTIONS
            argument_not_found = 1
            plugin_not_active  = 2
            internal_error     = 3
            OTHERS             = 4 ).
        
        IF sy-subrc <> 0.
          RAISE EXCEPTION TYPE zcx_integration_error
            EXPORTING
              textid = zcx_integration_error=>http_client_error.
        ENDIF.
        
        " Set HTTP version
        mo_http_client->request->set_version( if_http_request=>co_protocol_version_1_1 ).
        
        " Set authentication if needed
        mo_http_client->authenticate(
          username = 'API_USER'
          password = 'API_PASSWORD' ).
            
      CATCH cx_root INTO DATA(lo_exception).
        RAISE EXCEPTION TYPE zcx_integration_error
          EXPORTING
            previous = lo_exception.
    ENDTRY.
  ENDMETHOD.

  METHOD send_data_to_external_system.
    TRY.
        " Set request method
        mo_http_client->request->set_method( if_http_request=>co_request_method_post ).
        
        " Set content type
        mo_http_client->request->set_content_type( 'application/json' ).
        
        " Set request body
        mo_http_client->request->set_cdata( iv_data ).
        
        " Send request
        mo_http_client->send(
          EXCEPTIONS
            http_communication_failure = 1
            http_invalid_state         = 2
            http_processing_failed     = 3
            OTHERS                     = 4 ).
            
        IF sy-subrc <> 0.
          RAISE EXCEPTION TYPE zcx_integration_error
            EXPORTING
              textid = zcx_integration_error=>send_failed.
        ENDIF.
        
        " Receive response
        mo_http_client->receive(
          EXCEPTIONS
            http_communication_failure = 1
            http_invalid_state         = 2
            http_processing_failed     = 3
            OTHERS                     = 4 ).
            
        IF sy-subrc <> 0.
          RAISE EXCEPTION TYPE zcx_integration_error
            EXPORTING
              textid = zcx_integration_error=>receive_failed.
        ENDIF.
        
        " Get response
        rv_result = mo_http_client->response->get_cdata( ).
        
      CATCH cx_root INTO DATA(lo_exception).
        RAISE EXCEPTION TYPE zcx_integration_error
          EXPORTING
            previous = lo_exception.
    ENDTRY.
  ENDMETHOD.

  METHOD receive_data_from_external_system.
    TRY.
        " Set request method
        mo_http_client->request->set_method( if_http_request=>co_request_method_get ).
        
        " Set URL with source ID
        DATA(lv_url) = |https://api.example.com/data/{ iv_source_id }|.
        mo_http_client->request->set_header_field(
          name  = '~request_uri'
          value = lv_url ).
        
        " Send request
        mo_http_client->send(
          EXCEPTIONS
            http_communication_failure = 1
            http_invalid_state         = 2
            http_processing_failed     = 3
            OTHERS                     = 4 ).
            
        IF sy-subrc <> 0.
          RAISE EXCEPTION TYPE zcx_integration_error
            EXPORTING
              textid = zcx_integration_error=>send_failed.
        ENDIF.
        
        " Receive response
        mo_http_client->receive(
          EXCEPTIONS
            http_communication_failure = 1
            http_invalid_state         = 2
            http_processing_failed     = 3
            OTHERS                     = 4 ).
            
        IF sy-subrc <> 0.
          RAISE EXCEPTION TYPE zcx_integration_error
            EXPORTING
              textid = zcx_integration_error=>receive_failed.
        ENDIF.
        
        " Get response
        rv_data = mo_http_client->response->get_cdata( ).
        
      CATCH cx_root INTO DATA(lo_exception).
        RAISE EXCEPTION TYPE zcx_integration_error
          EXPORTING
            previous = lo_exception.
    ENDTRY.
  ENDMETHOD.
ENDCLASS.`,
    },
    {
      id: "4",
      name: "SAPUI5_Dashboard.txt",
      description: "Interactive dashboard using SAPUI5 framework",
      size: "32 KB",
      date: "2023-07-05",
      content: `sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/ui/core/format/DateFormat"
], function (Controller, JSONModel, MessageToast, DateFormat) {
  "use strict";

  return Controller.extend("com.mycompany.dashboard.controller.Dashboard", {
    onInit: function () {
      // Initialize the model
      var oModel = new JSONModel({
        salesData: [
          { product: "Product A", revenue: 15000, target: 12000 },
          { product: "Product B", revenue: 9500, target: 10000 },
          { product: "Product C", revenue: 22000, target: 20000 },
          { product: "Product D", revenue: 7800, target: 8000 }
        ],
        kpis: {
          totalRevenue: 54300,
          targetAchievement: 108.6,
          openOrders: 24,
          customerSatisfaction: 92.5
        },
        userInfo: {
          name: "Shreyas Lakade",
          role: "SAP Developer",
          lastLogin: new Date()
        }
      });
      
      this.getView().setModel(oModel);
      
      // Set up the chart
      this._setupCharts();
    },
    
    _setupCharts: function() {
      var oVizFrame = this.getView().byId("idVizFrame");
      oVizFrame.setVizProperties({
        plotArea: {
          colorPalette: ["#5899DA", "#E8743B", "#19A979", "#ED4A7B"],
          dataLabel: {
            visible: true
          }
        },
        title: {
          visible: false
        },
        legend: {
          title: {
            visible: false
          }
        }
      });
      
      var oPopover = this.getView().byId("idPopOver");
      oPopover.connect(oVizFrame.getVizUid());
    },
    
    formatDate: function(date) {
      if (!date) {
        return "";
      }
      
      var oDateFormat = DateFormat.getDateTimeInstance({
        pattern: "MMMM dd, yyyy 'at' HH:mm"
      });
      
      return oDateFormat.format(date);
    },
    
    onRefreshPressed: function() {
      // Simulate data refresh
      MessageToast.show("Dashboard data refreshed");
      
      // Update KPIs with random variations
      var oModel = this.getView().getModel();
      var oKpis = oModel.getProperty("/kpis");
      
      oKpis.totalRevenue = Math.round(oKpis.totalRevenue * (0.95 + Math.random() * 0.1));
      oKpis.targetAchievement = Math.round(oKpis.targetAchievement * (0.98 + Math.random() * 0.04) * 10) / 10;
      oKpis.openOrders = Math.round(oKpis.openOrders * (0.9 + Math.random() * 0.2));
      
      oModel.setProperty("/kpis", oKpis);
      oModel.setProperty("/userInfo/lastLogin", new Date());
    },
    
    onSettingsPressed: function() {
      // Show settings dialog
      if (!this._oSettingsDialog) {
        this._oSettingsDialog = sap.ui.xmlfragment(
          "com.mycompany.dashboard.view.SettingsDialog",
          this
        );
        this.getView().addDependent(this._oSettingsDialog);
      }
      
      this._oSettingsDialog.open();
    },
    
    onSettingsDialogClose: function() {
      this._oSettingsDialog.close();
    },
    
    onExportPressed: function() {
      MessageToast.show("Exporting dashboard data...");
      // Implementation for export functionality would go here
    },
    
    onNavToDetail: function(oEvent) {
      var sProduct = oEvent.getSource().getBindingContext().getProperty("product");
      MessageToast.show("Navigating to details for " + sProduct);
      // Navigation implementation would go here
    }
  });
});`,
    },
    {
      id: "5",
      name: "SAP_HANA_Optimization.txt",
      description: "SQL script for optimizing SAP HANA database performance",
      size: "18 KB",
      date: "2023-06-12",
      content: `-- SAP HANA Optimization Script
-- Author: Shreyas Lakade
-- Date: 2023-06-12

-- 1. Identify tables with high memory usage
SELECT SCHEMA_NAME, TABLE_NAME, MEMORY_SIZE_IN_TOTAL, RECORD_COUNT
FROM M_TABLES
ORDER BY MEMORY_SIZE_IN_TOTAL DESC
LIMIT 10;

-- 2. Identify columns that could benefit from dictionary compression
SELECT SCHEMA_NAME, TABLE_NAME, COLUMN_NAME, DISTINCT_COUNT, COUNT
FROM M_CS_COLUMNS
WHERE DISTINCT_COUNT < (COUNT * 0.1) -- Less than 10% distinct values
  AND DISTINCT_COUNT > 1
  AND COUNT > 1000000 -- Only consider tables with significant data
ORDER BY COUNT DESC;

-- 3. Create column store tables with appropriate partitioning
CREATE COLUMN TABLE "ZSALES_DATA" (
  "ID" BIGINT NOT NULL,
  "SALES_DATE" DATE NOT NULL,
  "CUSTOMER_ID" NVARCHAR(10) NOT NULL,
  "PRODUCT_ID" NVARCHAR(18) NOT NULL,
  "QUANTITY" DECIMAL(13,3),
  "AMOUNT" DECIMAL(15,2),
  "CURRENCY" NVARCHAR(5),
  "REGION" NVARCHAR(3),
  PRIMARY KEY ("ID")
)
PARTITION BY RANGE("SALES_DATE") (
  PARTITION '2020-01-01' <= VALUES < '2021-01-01',
  PARTITION '2021-01-01' <= VALUES < '2022-01-01',
  PARTITION '2022-01-01' <= VALUES < '2023-01-01',
  PARTITION '2023-01-01' <= VALUES < '2024-01-01',
  PARTITION OTHERS
);

-- 4. Create appropriate indexes
CREATE INDEX "IDX_ZSALES_CUSTOMER" ON "ZSALES_DATA" ("CUSTOMER_ID");
CREATE INDEX "IDX_ZSALES_PRODUCT" ON "ZSALES_DATA" ("PRODUCT_ID");
CREATE INDEX "IDX_ZSALES_REGION" ON "ZSALES_DATA" ("REGION");

-- 5. Optimize a complex query
WITH regional_sales AS (
  SELECT 
    REGION,
    PRODUCT_ID,
    SUM(AMOUNT) AS TOTAL_SALES
  FROM "ZSALES_DATA"
  WHERE SALES_DATE BETWEEN ADD_YEARS(CURRENT_DATE, -1) AND CURRENT_DATE
  GROUP BY REGION, PRODUCT_ID
),
product_ranking AS (
  SELECT 
    REGION,
    PRODUCT_ID,
    TOTAL_SALES,
    RANK() OVER (PARTITION BY REGION ORDER BY TOTAL_SALES DESC) AS RANK
  FROM regional_sales
)
SELECT 
  pr.REGION,
  pr.PRODUCT_ID,
  p.PRODUCT_NAME,
  pr.TOTAL_SALES
FROM product_ranking pr
JOIN "ZPRODUCTS" p ON pr.PRODUCT_ID = p.PRODUCT_ID
WHERE RANK <= 5
ORDER BY REGION, RANK;

-- 6. Create a calculation view for reporting
-- Note: This is a DDL representation of what would typically be created in HANA Studio
CREATE VIEW "CV_SALES_ANALYSIS" AS
SELECT 
  sd.SALES_DATE,
  YEAR(sd.SALES_DATE) AS YEAR,
  MONTH(sd.SALES_DATE) AS MONTH,
  c.CUSTOMER_NAME,
  c.CUSTOMER_GROUP,
  p.PRODUCT_NAME,
  p.PRODUCT_CATEGORY,
  p.PRODUCT_HIERARCHY,
  sd.QUANTITY,
  sd.AMOUNT,
  sd.CURRENCY,
  sd.REGION,
  r.REGION_NAME,
  r.COUNTRY
FROM "ZSALES_DATA" sd
JOIN "ZCUSTOMERS" c ON sd.CUSTOMER_ID = c.CUSTOMER_ID
JOIN "ZPRODUCTS" p ON sd.PRODUCT_ID = p.PRODUCT_ID
JOIN "ZREGIONS" r ON sd.REGION = r.REGION_CODE;

-- 7. Analyze execution plan for a problematic query
EXPLAIN PLAN FOR
SELECT 
  CUSTOMER_ID,
  SUM(AMOUNT) AS TOTAL_AMOUNT
FROM "ZSALES_DATA"
WHERE SALES_DATE BETWEEN '2023-01-01' AND '2023-06-30'
  AND REGION IN ('NA', 'EU')
GROUP BY CUSTOMER_ID
HAVING SUM(AMOUNT) > 10000
ORDER BY TOTAL_AMOUNT DESC;

-- 8. Create a stored procedure for data cleanup
CREATE PROCEDURE "SP_CLEANUP_OLD_DATA" (
  IN oldest_date DATE,
  OUT deleted_count INTEGER
)
LANGUAGE SQLSCRIPT
SQL SECURITY INVOKER
AS
BEGIN
  -- Archive data to history table first
  INSERT INTO "ZSALES_DATA_HISTORY"
  SELECT * FROM "ZSALES_DATA"
  WHERE SALES_DATE < :oldest_date;
  
  -- Delete old data
  DELETE FROM "ZSALES_DATA"
  WHERE SALES_DATE < :oldest_date;
  
  deleted_count := ::ROWCOUNT;
END;`,
    },
    {
      id: "6",
      name: "SAP_Fiori_App.txt",
      description: "SAP Fiori application development example",
      size: "42 KB",
      date: "2023-05-18",
      content: `// SAP Fiori Application Example
// Component.js
sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "com/mycompany/salesapp/model/models"
], function(UIComponent, Device, models) {
  "use strict";

  return UIComponent.extend("com.mycompany.salesapp.Component", {
    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function() {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // set the device model
      this.setModel(models.createDeviceModel(), "device");

      // create the views based on the url/hash
      this.getRouter().initialize();
    }
  });
});`,
    },
  ])

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate upload process
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const newFile: FileItem = {
      id: `${codeFiles.length + 1}`,
      name: (formData.get("file-name") as string) || "Unnamed File.txt",
      description: (formData.get("file-description") as string) || "No description provided",
      size: "10 KB", // Simulated size
      date: new Date().toISOString().split("T")[0],
      content: "Your file content will appear here.", // Default content
    }

    setCodeFiles([...codeFiles, newFile])
    setUploadStatus("success")
    form.reset()
    setTimeout(() => setUploadStatus(null), 3000)
  }

  const handleDeleteFile = (id: string) => {
    setCodeFiles(codeFiles.filter((file) => file.id !== id))
  }

  const displayedFiles = showAllFiles ? codeFiles : codeFiles.slice(0, 4)

  return (
    <section id="file-share" className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Code Sharing</h2>
          <p className="mt-2 text-muted-foreground">Download code samples or upload your files for review</p>
        </div>

        <ClientWrapper>
          <Tabs defaultValue="files" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="files">Files</TabsTrigger>
              {isAdmin && <TabsTrigger value="upload">Upload Files</TabsTrigger>}
            </TabsList>

            <TabsContent value="files" className="mt-6">
              <div className="space-y-6">
                <div className="grid gap-4">
                  {displayedFiles.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-card/80 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <FileText size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{file.name}</h3>
                          <p className="text-sm text-muted-foreground">{file.description}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{file.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-1">
                              <Eye size={14} />
                              Display
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{file.name}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 p-4 bg-muted rounded-md overflow-x-auto">
                              <pre className="text-sm whitespace-pre-wrap">{file.content}</pre>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button size="sm" variant="outline" className="gap-1">
                          <Download size={14} />
                          Download
                        </Button>

                        {isAdmin && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteFile(file.id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {codeFiles.length > 4 && (
                  <div className="flex justify-center">
                    <Button variant="outline" onClick={() => setShowAllFiles(!showAllFiles)} className="gap-2">
                      {showAllFiles ? "Show Less" : "View All Files"}
                      <ChevronRight className={`transition-transform ${showAllFiles ? "rotate-90" : ""}`} size={16} />
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {isAdmin && (
              <TabsContent value="upload" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="max-w-md mx-auto"
                >
                  <form onSubmit={handleUpload} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="file-name">File name</Label>
                      <Input id="file-name" name="file-name" placeholder="example.txt" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file-upload">Upload your code file</Label>
                      <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                        <Input id="file-upload" type="file" className="hidden" accept=".txt,.js,.py,.abap" />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                          <Upload size={24} className="text-muted-foreground" />
                          <span className="text-sm font-medium">Click to upload or drag and drop</span>
                          <span className="text-xs text-muted-foreground">TXT, JS, PY, ABAP (Max 5MB)</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file-description">File description</Label>
                      <Input
                        id="file-description"
                        name="file-description"
                        placeholder="Briefly describe your code file"
                      />
                    </div>

                    {uploadStatus && (
                      <div
                        className={`flex items-center gap-2 p-2 rounded-md ${
                          uploadStatus === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {uploadStatus === "success" ? (
                          <>
                            <Check size={16} />
                            <span>File uploaded successfully!</span>
                          </>
                        ) : (
                          <>
                            <X size={16} />
                            <span>Upload failed. Please try again.</span>
                          </>
                        )}
                      </div>
                    )}

                    <Button type="submit" className="w-full">
                      <Upload size={16} className="mr-2" />
                      Upload File
                    </Button>
                  </form>
                </motion.div>
              </TabsContent>
            )}
          </Tabs>
        </ClientWrapper>
      </motion.div>
    </section>
  )
}

