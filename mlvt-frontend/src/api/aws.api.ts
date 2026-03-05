import axios from 'axios';

export const putImageS3 = async (URL: string, file: File) => {
    return axios
        .put(URL, file, {
            headers: {
                'Content-Type': 'image/jpg',
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });
};

export const putDynamicFileType = async (URL: string, file: File | Blob, fileType: string) => {
    return axios
        .put(URL, file, {
            headers: {
                'Content-Type': fileType,
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });
};

export const putStringTextS3 = async (
    content: string,
    presignedUrl: string,
    fileName: string = 'file.txt'
): Promise<void> => {
    try {
        const blob = new Blob([content], { type: 'text/plain' });

        const response = await fetch(presignedUrl, {
            method: 'PUT',
            body: blob,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
        }

        console.log(`File "${fileName}" uploaded successfully to S3.`);
    } catch (error) {
        console.error('Error uploading file to S3:', error);
    }
};

export async function getTextFileContent(downloadUrl: string): Promise<string> {
    try {
        const response = await fetch(downloadUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        const text = await response.text(); // Đọc nội dung dưới dạng text
        return text;
    } catch (error) {
        console.error('Error fetching file content:', error);
        throw error;
    }
}
