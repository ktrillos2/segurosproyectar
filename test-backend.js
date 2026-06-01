const payload = {
  "cliente": {
    "tipo_documento": "CC",
    "numero_documento": "1020719698",
    "nombre": "Stephany",
    "apellidos": "Campos Sarmientos",
    "fecha_nacimiento": "16/10/2004",
    "genero": "Femenino",
    "correo": "clienteprueba@gmail.com",
    "celular": "3001234567",
    "direccion": "Calle 123 # 45 - 67"
  },
  "vehiculo": {
    "placa": "KNY605",
    "ciudad": "BOGOTA",
    "departamento": "BOGOTA",
    "modelo": "2022",
    "precio": "50000000",
    "marca": "RENAULT",
    "linea": "KWID",
    "descripcion": "RENAULT KWID",
    "color": "BLANCO",
    "servicio": "Particular",
    "cero_km": false,
    "valor_accesorios": "0",
    "oneroso": false,
    "beneficiario": false
  }
};

const BOT_API_URL = "http://179.50.90.163:8000/api/v1";

async function test() {
  try {
    console.log("Sending payload to bot...");
    const res = await fetch(`${BOT_API_URL}/cotizar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    let text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch(e) {
      console.error("Bot didn't return JSON:", text);
      return;
    }
    
    console.dir(data, { depth: null });
    
    if (!data.task_id) {
      console.error("No task_id returned");
      return;
    }
    
    const taskId = data.task_id;
    console.log(`Polling task ID: ${taskId}`);
    
    let attempt = 0;
    while (attempt < 24) { // 2 minutes (24 * 5s)
      await new Promise(r => setTimeout(r, 5000));
      attempt++;
      
      const pollRes = await fetch(`${BOT_API_URL}/cotizar/status/${taskId}`);
      const pollText = await pollRes.text();
      let pollData;
      try {
        pollData = JSON.parse(pollText);
      } catch (e) {
        console.error(`Attempt ${attempt}: Response is not JSON:`, pollText);
        continue;
      }
      
      console.log(`\n--- Attempt ${attempt} ---`);
      if (pollData.status === "procesando") {
        console.log("Status: procesando");
      } else {
        console.dir(pollData, { depth: null });
      }
      
      if (pollData.status === "completado" || pollData.status === "completado_con_errores" || pollData.status === "error") {
        console.log("Finished polling.");
        break;
      }
    }
  } catch (err) {
    console.error("Test failed:", err);
  }
}

test();
