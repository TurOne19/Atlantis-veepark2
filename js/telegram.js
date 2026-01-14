/* =====================================================
TELEGRAM.JS
Contact form → Telegram bot
===================================================== */

/*
ИНСТРУКЦИЯ:
1. Заменишь TELEGRAM_BOT_TOKEN
2. Заменишь TELEGRAM_CHAT_ID
3. БОЛЬШЕ НИЧЕГО ТРОГАТЬ НЕ НАДО
*/

const TELEGRAM_BOT_TOKEN = "8275112739:AAFKoB78mXAvPxSo5lv9uuM382JDcoWUH_0";
const TELEGRAM_CHAT_ID = "8146157246";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("telegramForm");
    if (!form) return;

    const submitBtn = form.querySelector("button");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = form.querySelector('input[name="name"]').value.trim();
        const phone = form.querySelector('input[name="phone"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();

        if (!name || !phone) {
            alert("Palun täida nimi ja telefon.");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Saatmine...";

        const text =
`📩 UUS PÄRING – Atlantis H2O

👤 Nimi: ${name}
📞 Telefon: ${phone}
💬 Sõnum:
${message || "—"}`;

        try {
            const response = await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: text,
                        parse_mode: "HTML"
                    })
                }
            );

            if (!response.ok) throw new Error("Telegram error");

            form.reset();
            alert("✅ Teie sõnum on saadetud!");

        } catch (error) {
            console.error(error);
            alert("❌ Viga. Proovi hiljem uuesti.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Saada";
        }
    });

});
