#!/usr/bin/env python3
"""Generate the approved one-page Spanish and English portfolio CVs."""

from __future__ import annotations

import argparse
import urllib.request
from pathlib import Path
from typing import Iterable

from pypdf import PdfReader, PdfWriter
from pypdf.generic import BooleanObject, DictionaryObject, NameObject, TextStringObject
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
FONT_DIR = ROOT / "tmp" / "pdfs" / "fonts"
PLEX_REVISION = "bf260093582f04622aacc1e9f9ca604d7ccd0c42"
PLEX_RAW = f"https://raw.githubusercontent.com/IBM/plex/{PLEX_REVISION}/packages"

FONT_URLS = {
    "PlexSans": f"{PLEX_RAW}/plex-sans/fonts/complete/ttf/IBMPlexSans-Regular.ttf",
    "PlexSansMedium": f"{PLEX_RAW}/plex-sans/fonts/complete/ttf/IBMPlexSans-Medium.ttf",
    "PlexSansSemiBold": f"{PLEX_RAW}/plex-sans/fonts/complete/ttf/IBMPlexSans-SemiBold.ttf",
    "PlexMono": f"{PLEX_RAW}/plex-mono/fonts/complete/ttf/IBMPlexMono-Regular.ttf",
}

GRAPHITE = HexColor("#090D0C")
RAISED = HexColor("#111816")
INK = HexColor("#E6ECEA")
MUTED = HexColor("#A6B0AD")
QUIET = HexColor("#73807C")
BORDER = HexColor("#26302D")
ACCENT = HexColor("#2DD4BF")

PAGE_W, PAGE_H = A4
LEFT = 12 * mm
RIGHT = 12 * mm
TOP = PAGE_H - 11.5 * mm
BOTTOM = 10.5 * mm
MAIN_W = 122 * mm
GUTTER = 8 * mm
SIDE_X = LEFT + MAIN_W + GUTTER
SIDE_W = PAGE_W - RIGHT - SIDE_X


CVS = {
    "es": {
        "output": OUTPUT_DIR / "cv.pdf",
        "lang": "es-CL",
        "title": "CV de Bastián Ibáñez Martínez",
        "document_label": "CV / 2026",
        "role": "Software Engineer · Full-Stack & Applied AI",
        "location": "Santiago, Chile",
        "profile_heading": "Perfil",
        "profile": (
            "Ingeniero de software enfocado en productos full-stack, automatización "
            "operacional e IA aplicada. Diseño sistemas que conectan modelos, datos y "
            "operaciones reales con límites explícitos, trazabilidad y caminos de recuperación."
        ),
        "experience_heading": "Experiencia",
        "experience": [
            {
                "role": "Lead Software Engineer",
                "company": "NotoriosTI",
                "dates": "AGO 2025 - ACTUALIDAD",
                "bullets": [
                    "Lidero un equipo de tres ingenieros que desarrolla automatización "
                    "con IA para operaciones de comercio electrónico.",
                    "Definí la arquitectura y operación en nube de un agente "
                    "multi-especialista para producción, compras y análisis sobre datos de ERP.",
                    "Diseñé integraciones y servicios para eventos de marketplaces, "
                    "monitoreo operacional y configuración segura entre entornos.",
                ],
            },
            {
                "role": "Junior Software Engineer",
                "company": "NotoriosTI",
                "dates": "MAY 2025 - AGO 2025",
                "bullets": [
                    "Construí las bases del agente operacional y la integración con mensajería y ERP.",
                    "Configuré infraestructura en GCP para servicios, datos, secretos y despliegues en contenedores.",
                ],
            },
        ],
        "projects_heading": "Proyectos seleccionados",
        "projects": [
            (
                "Plataforma operacional para manufactura",
                "Producto full-stack entregado y desplegado; inventario trazable, "
                "fabricación transaccional y flujos E2E.",
            ),
            (
                "GroupFit",
                "Solver híbrido para asignación de grupos bajo restricciones, con "
                "salida Excel/JSON y explicaciones para casos no asignados.",
            ),
            (
                "go-agent",
                "Agente de terminal en Go con arquitectura hexagonal, cuatro "
                "proveedores, herramientas controladas y persistencia.",
            ),
        ],
        "contact_heading": "Contacto",
        "education_heading": "Educación",
        "degree": "Ingeniería Civil en Informática",
        "school": "Universidad Andrés Bello",
        "education_dates": "2022 - 2027 (esperado)",
        "technology_heading": "Tecnologías",
        "technology_groups": [
            ("LENGUAJES", "Python, Go, TypeScript"),
            ("PRODUCTO", "FastAPI, LangGraph, React, Next.js"),
            ("DATOS", "PostgreSQL, BigQuery"),
            ("ENTREGA", "Docker, GCP, Cloudflare"),
        ],
        "languages_heading": "Idiomas",
        "languages": [
            ("Español", "Nativo"),
            ("Inglés", "C1 · Cambridge FCE, 2021"),
            ("Alemán", "C1 · DSD II, 2021"),
        ],
        "outline": [
            "Perfil",
            "Experiencia",
            "Proyectos",
            "Educación",
            "Tecnologías",
            "Idiomas",
        ],
    },
    "en": {
        "output": OUTPUT_DIR / "en" / "cv.pdf",
        "lang": "en",
        "title": "Bastián Ibáñez Martínez - Resume",
        "document_label": "RESUME / 2026",
        "role": "Software Engineer · Full-Stack & Applied AI",
        "location": "Santiago, Chile",
        "profile_heading": "Profile",
        "profile": (
            "Software engineer focused on full-stack products, operational automation, "
            "and applied AI. I design systems that connect models, data, and real operations "
            "with explicit boundaries, traceability, and recovery paths."
        ),
        "experience_heading": "Experience",
        "experience": [
            {
                "role": "Lead Software Engineer",
                "company": "NotoriosTI",
                "dates": "AUG 2025 - PRESENT",
                "bullets": [
                    "Lead a three-engineer team building AI-powered automation for e-commerce operations.",
                    "Defined the architecture and cloud operation of a multi-specialist "
                    "agent for production, purchasing, and analysis over ERP data.",
                    "Designed integrations and services for marketplace events, "
                    "operational monitoring, and secure configuration across environments.",
                ],
            },
            {
                "role": "Junior Software Engineer",
                "company": "NotoriosTI",
                "dates": "MAY 2025 - AUG 2025",
                "bullets": [
                    "Built the foundations of the operations agent and its messaging and ERP integration.",
                    "Configured GCP infrastructure for services, data, secrets, and container delivery.",
                ],
            },
        ],
        "projects_heading": "Selected projects",
        "projects": [
            (
                "Manufacturing operations platform",
                "Delivered and deployed full-stack product with traceable inventory, "
                "transactional manufacturing, and E2E flows.",
            ),
            (
                "GroupFit",
                "Hybrid constrained-assignment solver with Excel/JSON output and explanations for unplaced cases.",
            ),
            (
                "go-agent",
                "Terminal agent in Go with hexagonal architecture, four providers, controlled tools, and persistence.",
            ),
        ],
        "contact_heading": "Contact",
        "education_heading": "Education",
        "degree": "Computer Science and Engineering",
        "school": "Universidad Andrés Bello",
        "education_dates": "2022 - 2027 (expected)",
        "technology_heading": "Technologies",
        "technology_groups": [
            ("LANGUAGES", "Python, Go, TypeScript"),
            ("PRODUCT", "FastAPI, LangGraph, React, Next.js"),
            ("DATA", "PostgreSQL, BigQuery"),
            ("DELIVERY", "Docker, GCP, Cloudflare"),
        ],
        "languages_heading": "Languages",
        "languages": [
            ("Spanish", "Native"),
            ("English", "C1 · Cambridge FCE, 2021"),
            ("German", "C1 · DSD II, 2021"),
        ],
        "outline": ["Profile", "Experience", "Projects", "Education", "Technologies", "Languages"],
    },
}


def ensure_fonts() -> None:
    FONT_DIR.mkdir(parents=True, exist_ok=True)
    for name, url in FONT_URLS.items():
        path = FONT_DIR / f"{name}.ttf"
        if not path.exists():
            urllib.request.urlretrieve(url, path)
        pdfmetrics.registerFont(TTFont(name, path))
    pdfmetrics.registerFontFamily(
        "PlexSans",
        normal="PlexSans",
        bold="PlexSansSemiBold",
    )


def paragraph_style(
    name: str,
    *,
    font: str = "PlexSans",
    size: float = 8.25,
    leading: float = 10.4,
    color=INK,
    space_after: float = 0,
) -> ParagraphStyle:
    return ParagraphStyle(
        name,
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=space_after,
        allowWidows=0,
        allowOrphans=0,
        splitLongWords=False,
    )


BODY = paragraph_style("body", size=9, leading=11.5)
BODY_MUTED = paragraph_style("body-muted", size=9, leading=11.5, color=MUTED)
BODY_SMALL = paragraph_style("body-small", size=8.35, leading=10.6, color=MUTED)
SIDE_BODY = paragraph_style("side-body", size=8, leading=10, color=MUTED)
SIDE_INK = paragraph_style("side-ink", size=8.35, leading=10.3, color=INK)
SIDE_LABEL = paragraph_style("side-label", font="PlexMono", size=6.8, leading=8.4, color=QUIET)


def draw_paragraph(c: canvas.Canvas, text: str, x: float, y: float, width: float, style: ParagraphStyle) -> float:
    para = Paragraph(text, style)
    _, height = para.wrap(width, PAGE_H)
    para.drawOn(c, x, y - height)
    return y - height


def section_heading(c: canvas.Canvas, text: str, x: float, y: float, width: float) -> float:
    c.setFillColor(ACCENT)
    c.rect(x, y - 7.2, 2.2, 7.2, stroke=0, fill=1)
    c.setFont("PlexSansSemiBold", 9.7)
    c.setFillColor(INK)
    c.drawString(x + 7, y - 6.8, text)
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.55)
    c.line(x, y - 12, x + width, y - 12)
    return y - 20


def bullet(c: canvas.Canvas, text: str, x: float, y: float, width: float) -> float:
    c.setFillColor(ACCENT)
    c.rect(x, y - 5.5, 2, 2, stroke=0, fill=1)
    return draw_paragraph(c, text, x + 7, y, width - 7, BODY_SMALL)


def project(c: canvas.Canvas, name: str, description: str, x: float, y: float, width: float) -> float:
    text = f'<font name="PlexSansSemiBold" color="#E6ECEA">{name}.</font> {description}'
    c.setFillColor(BORDER)
    c.rect(x, y - 5.4, 2, 2, stroke=0, fill=1)
    return draw_paragraph(c, text, x + 7, y, width - 7, BODY_SMALL)


def text_link(c: canvas.Canvas, label: str, url: str, x: float, y: float, max_width: float) -> float:
    font = "PlexSansMedium"
    size = 8
    rendered = label
    while pdfmetrics.stringWidth(rendered, font, size) > max_width and len(rendered) > 4:
        rendered = rendered[:-1]
    if rendered != label:
        rendered = rendered[:-1] + "…"
    width = pdfmetrics.stringWidth(rendered, font, size)
    c.setFont(font, size)
    c.setFillColor(ACCENT)
    c.drawString(x, y, rendered)
    c.setStrokeColor(ACCENT)
    c.setLineWidth(0.35)
    c.line(x, y - 1.5, x + width, y - 1.5)
    c.linkURL(url, (x, y - 3, x + width, y + size + 1), relative=0, thickness=0)
    return y - 13


def draw_header(c: canvas.Canvas, cv: dict) -> float:
    c.setFont("PlexMono", 6.6)
    c.setFillColor(QUIET)
    c.drawString(LEFT, TOP, cv["document_label"])

    name_y = TOP - 25
    c.setFont("PlexSansSemiBold", 24)
    c.setFillColor(INK)
    c.drawString(LEFT, name_y, "Bastián Ibáñez Martínez")

    c.setFont("PlexSansMedium", 10.6)
    c.setFillColor(MUTED)
    c.drawString(LEFT, name_y - 19, cv["role"])

    c.setFont("PlexMono", 6.8)
    c.setFillColor(QUIET)
    c.drawRightString(PAGE_W - RIGHT, TOP, cv["location"].upper())
    c.setFont("PlexSansMedium", 7.8)
    c.setFillColor(ACCENT)
    email = "ibanezmbastian@gmail.com"
    email_w = pdfmetrics.stringWidth(email, "PlexSansMedium", 7.8)
    email_x = PAGE_W - RIGHT - email_w
    c.drawString(email_x, TOP - 15, email)
    c.linkURL(
        "mailto:ibanezmbastian@gmail.com",
        (email_x, TOP - 18, PAGE_W - RIGHT, TOP - 6),
        relative=0,
        thickness=0,
    )

    rule_y = name_y - 34
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.7)
    c.line(LEFT, rule_y, PAGE_W - RIGHT, rule_y)
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.6)
    c.line(LEFT, rule_y, LEFT + 31 * mm, rule_y)
    return rule_y - 18


def draw_main(c: canvas.Canvas, cv: dict, start_y: float) -> None:
    y = section_heading(c, cv["profile_heading"], LEFT, start_y, MAIN_W)
    y = draw_paragraph(c, cv["profile"], LEFT, y, MAIN_W, BODY_MUTED) - 15

    y = section_heading(c, cv["experience_heading"], LEFT, y, MAIN_W)
    for index, job in enumerate(cv["experience"]):
        c.setFont("PlexSansSemiBold", 9.5)
        c.setFillColor(INK)
        c.drawString(LEFT, y - 2, job["role"])
        c.setFont("PlexSans", 8.5)
        c.setFillColor(MUTED)
        role_width = pdfmetrics.stringWidth(job["role"], "PlexSansSemiBold", 9.5)
        c.drawString(LEFT + role_width + 5, y - 2, f"/ {job['company']}")
        c.setFont("PlexMono", 6.3)
        c.setFillColor(QUIET)
        c.drawRightString(LEFT + MAIN_W, y - 1, job["dates"])
        y -= 13
        for item in job["bullets"]:
            y = bullet(c, item, LEFT + 1, y, MAIN_W - 1) - 3.2
        if index < len(cv["experience"]) - 1:
            y -= 4.5

    y -= 9
    y = section_heading(c, cv["projects_heading"], LEFT, y, MAIN_W)
    for name, description in cv["projects"]:
        y = project(c, name, description, LEFT + 1, y, MAIN_W - 1) - 4

    if y < BOTTOM + 5 * mm:
        raise RuntimeError(f"Main column overflowed by {BOTTOM + 5 * mm - y:.1f} pt")


def draw_sidebar(c: canvas.Canvas, cv: dict, start_y: float) -> None:
    panel_x = SIDE_X - 4.5 * mm
    panel_w = PAGE_W - RIGHT - panel_x
    c.setFillColor(RAISED)
    c.roundRect(panel_x, BOTTOM, panel_w, start_y - BOTTOM + 10, 2.5, stroke=0, fill=1)

    y = section_heading(c, cv["contact_heading"], SIDE_X, start_y, SIDE_W)
    y = text_link(c, "ibanezmbastian@gmail.com", "mailto:ibanezmbastian@gmail.com", SIDE_X, y, SIDE_W)
    y = text_link(c, "github.com/bastianibanez", "https://github.com/bastianibanez", SIDE_X, y, SIDE_W)
    y = text_link(c, "linkedin.com/in/ibanezbastian", "https://www.linkedin.com/in/ibanezbastian", SIDE_X, y, SIDE_W)
    y -= 11

    y = section_heading(c, cv["education_heading"], SIDE_X, y, SIDE_W)
    y = draw_paragraph(c, f'<font name="PlexSansSemiBold">{cv["degree"]}</font>', SIDE_X, y, SIDE_W, SIDE_INK) - 2
    y = draw_paragraph(c, cv["school"], SIDE_X, y, SIDE_W, SIDE_BODY) - 3
    y = draw_paragraph(c, cv["education_dates"], SIDE_X, y, SIDE_W, SIDE_LABEL) - 13

    y = section_heading(c, cv["technology_heading"], SIDE_X, y, SIDE_W)
    for label, values in cv["technology_groups"]:
        y = draw_paragraph(c, label, SIDE_X, y, SIDE_W, SIDE_LABEL) - 1
        y = draw_paragraph(c, values, SIDE_X, y, SIDE_W, SIDE_BODY) - 7
    y -= 5

    y = section_heading(c, cv["languages_heading"], SIDE_X, y, SIDE_W)
    for language, level in cv["languages"]:
        label = (
            f'<font name="PlexSansMedium" color="#E6ECEA">{language}</font>'
            f"<br/>{level}"
        )
        y = draw_paragraph(c, label, SIDE_X, y, SIDE_W, SIDE_BODY) - 7

    if y < BOTTOM + 5 * mm:
        raise RuntimeError(f"Sidebar overflowed by {BOTTOM + 5 * mm - y:.1f} pt")


def add_accessibility_metadata(path: Path, cv: dict) -> None:
    reader = PdfReader(path)
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    writer.add_metadata(
        {
            "/Title": cv["title"],
            "/Author": "Bastián Ibáñez Martínez",
            "/Subject": cv["role"],
            "/Keywords": "software engineering, full-stack, applied AI, Python, Go, TypeScript",
            "/Creator": "Portfolio CV generator",
        }
    )
    writer.root_object[NameObject("/Lang")] = TextStringObject(cv["lang"])
    writer.root_object[NameObject("/ViewerPreferences")] = DictionaryObject(
        {NameObject("/DisplayDocTitle"): BooleanObject(True)}
    )
    writer.root_object[NameObject("/PageMode")] = NameObject("/UseOutlines")
    for label in cv["outline"]:
        writer.add_outline_item(label, 0)
    temp = path.with_suffix(".tmp.pdf")
    with temp.open("wb") as stream:
        writer.write(stream)
    temp.replace(path)


def build_pdf(cv: dict) -> Path:
    output = Path(cv["output"])
    output.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(output), pagesize=A4, pageCompression=1)
    c.setTitle(cv["title"])
    c.setAuthor("Bastián Ibáñez Martínez")
    c.setSubject(cv["role"])
    c.setFillColor(GRAPHITE)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    start_y = draw_header(c, cv)
    draw_main(c, cv, start_y)
    draw_sidebar(c, cv, start_y)
    c.showPage()
    c.save()
    add_accessibility_metadata(output, cv)
    return output


def generate(languages: Iterable[str]) -> list[Path]:
    ensure_fonts()
    return [build_pdf(CVS[language]) for language in languages]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--language", choices=["es", "en", "all"], default="all")
    args = parser.parse_args()
    languages = CVS.keys() if args.language == "all" else [args.language]
    for output in generate(languages):
        print(output.relative_to(ROOT))


if __name__ == "__main__":
    main()
