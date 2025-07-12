'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LifeBuoy } from "lucide-react";

export default function SupportPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
            <h1 className="text-3xl font-bold">Support & Resources</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LifeBuoy className="h-5 w-5 text-white" />
                        Tutorials & Community
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Access tutorials, scripts, GDPR info, and join the Ravna community chat for support.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
} 