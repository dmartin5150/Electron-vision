# Import required packages
import sys
import cv2
import pytesseract
from pytesseract import Output
from PIL import  Image
import pyautogui

import numpy as np


# Mention the installed location of Tesseract-OCR in your system
pytesseract.pytesseract.tesseract_cmd = r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

def convertImage(img):
# Read image from which text needs to be extracted
    pic_array = np.array(img)
    converted = cv2.cvtColor(pic_array,cv2.COLOR_BGRA2GRAY)
    convertedImage = Image.fromarray(converted)
    convertedImage.show()
    return converted


def getImageData(img):
    return pytesseract.image_to_data(img,lang='eng',output_type=Output.DICT)


def getMRNandFIN(img,imgData):
    curData = imgData['text']
    curMRN = 'Not Found'
    curFIN = 'Not Found'
    if (len(curData) > 0):
        for i in range(0, len(curData)):
            curElement = curData[i]
            if ('MRN:' in curElement):
                # print('mrn index', i)
                # print('mrn', curElement)
                parsedElement = curElement.split(":")
                curMRN = parsedElement[1]
            if ('Fin#:' in curElement):
                # print('found fin')
                parsedElement = curElement.split(":")
                curFIN = parsedElement[1]
    return curMRN, curFIN


        





def getScreenshot():
    # img = os.system("screencapture screen.png")
    # img = ImageGrab.grab(bbox= None,include_layered_windows=True, all_screens=True)
    img = ""
    img = pyautogui.screenshot()
    # img.show()
    return img


def get_patient_data(): 
    img = getScreenshot()
    imgData = getImageData(img)
    curMRN, curFIN = getMRNandFIN(img,imgData)
    print(curFIN)
    print(curMRN)
    sys.stdout.flush()

get_patient_data()






