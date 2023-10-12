import { useState } from "react";
import * as XLSX from "xlsx";

export default function useImportExcel() {
	const [data, setData] = useState([]);
	const handleGetFile = (file) => {
		/* Boilerplate to set up FileReader */
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			/* chuyển đổi data*/
			const bstr = e?.target && e.target.result;
			const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
			/* lấy all sheet */
			let sheets = [];
			wb.SheetNames.forEach((item) => {
				const ws = wb.Sheets[item];
				/* Convert array of arrays */
				const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) || [];
				sheets = [...sheets, ...data];
			});
			setData(sheets);
		};
		if (rABS) reader.readAsBinaryString(file);
		else reader.readAsArrayBuffer(file);
	};
	return { data, handleGetFile };
}
