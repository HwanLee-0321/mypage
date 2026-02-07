import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Function to show resume in preview modal
export const showResumePreview = async () => {
    const resumeElement = document.getElementById('resume');
    const previewContainer = document.getElementById('resume-for-preview');

    if (!resumeElement || !previewContainer) {
        console.error("Resume or preview container not found");
        return;
    }

    // Clone the resume for preview
    const clone = resumeElement.cloneNode(true) as HTMLElement;
    previewContainer.innerHTML = '';
    previewContainer.appendChild(clone);
};

export const downloadResumeAsPDF = async (language: 'ko' | 'en' = 'ko') => {
    const resumeElement = document.getElementById('resume-for-preview') || document.getElementById('resume');

    if (!resumeElement) {
        console.error("Resume element not found");
        alert(language === 'ko'
            ? "이력서를 찾을 수 없습니다. 페이지를 새로고침 후 다시 시도해주세요."
            : "Resume not found. Please refresh the page and try again.");
        return;
    }

    try {
        const parentElement = resumeElement.parentElement;
        if (!parentElement) {
            throw new Error("Parent element not found");
        }

        // Ensure parent is visible
        const originalParentDisplay = parentElement.style.display;
        const originalPosition = parentElement.style.position;

        if (parentElement.id !== 'resume-preview-container') {
            parentElement.style.display = 'block';
            parentElement.style.position = 'fixed';
            parentElement.style.top = '0';
            parentElement.style.left = '0';
            parentElement.style.zIndex = '-9999';
            parentElement.style.width = '900px';
            parentElement.style.backgroundColor = '#ffffff';
        }

        // Wait for rendering
        await new Promise(resolve => setTimeout(resolve, 800));

        // Get all links before converting to canvas
        const links = resumeElement.querySelectorAll('a');
        const linkData: Array<{ href: string, rect: DOMRect, text: string }> = [];

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const rect = link.getBoundingClientRect();
                const parentRect = resumeElement.getBoundingClientRect();
                linkData.push({
                    href,
                    text: link.textContent || '',
                    rect: new DOMRect(
                        rect.left - parentRect.left,
                        rect.top - parentRect.top,
                        rect.width,
                        rect.height
                    )
                });
            }
        });

        // Convert to canvas with high quality
        const canvas = await html2canvas(resumeElement, {
            scale: 3, // Higher scale for better text quality
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: 900,
            windowHeight: resumeElement.scrollHeight,
            imageTimeout: 0,
            removeContainer: false,
        });

        // Restore original styles if modified
        if (parentElement.id !== 'resume-preview-container') {
            parentElement.style.display = originalParentDisplay;
            parentElement.style.position = originalPosition;
        }

        const imgData = canvas.toDataURL('image/jpeg', 0.95); // Use JPEG for smaller file size
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const ratio = pdfWidth / imgWidth;
        const scaledHeight = imgHeight * ratio;

        // Add image to PDF (single or multi-page)
        if (scaledHeight <= pdfHeight) {
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, scaledHeight);
        } else {
            let heightLeft = scaledHeight;
            let position = 0;

            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, scaledHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, scaledHeight);
                heightLeft -= pdfHeight;
            }
        }

        // Add clickable links to PDF
        linkData.forEach(linkInfo => {
            const x = linkInfo.rect.left * ratio;
            const y = linkInfo.rect.top * ratio;
            const width = linkInfo.rect.width * ratio;
            const height = linkInfo.rect.height * ratio;

            // Calculate which page this link is on
            const pageNumber = Math.floor(y / pdfHeight) + 1;
            const yOnPage = y % pdfHeight;

            if (pageNumber <= pdf.getNumberOfPages()) {
                pdf.setPage(pageNumber);
                pdf.link(x, yOnPage, width, height, { url: linkInfo.href });
            }
        });

        const fileName = language === 'ko'
            ? 'LeeJaeHwan_이력서.pdf'
            : 'LeeJaeHwan_Resume.pdf';

        pdf.save(fileName);

        if (language === 'ko') {
            console.log("✅ 이력서 다운로드 완료!");
        } else {
            console.log("✅ Resume downloaded successfully!");
        }
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert(language === 'ko'
            ? "PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요."
            : "An error occurred while generating the PDF. Please try again.");
    }
};
